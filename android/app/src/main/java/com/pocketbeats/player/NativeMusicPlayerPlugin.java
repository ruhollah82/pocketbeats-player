package com.pocketbeats.player;

import android.content.Intent;
import android.Manifest;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.provider.MediaStore;
import androidx.core.content.ContextCompat;
import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

@CapacitorPlugin(
    name = "NativeMusicPlayer",
    permissions = {
        @Permission(strings = { Manifest.permission.READ_MEDIA_AUDIO }, alias = NativeMusicPlayerPlugin.AUDIO_PERMISSION),
        @Permission(strings = { Manifest.permission.READ_EXTERNAL_STORAGE }, alias = NativeMusicPlayerPlugin.LEGACY_AUDIO_PERMISSION),
        @Permission(strings = { Manifest.permission.POST_NOTIFICATIONS }, alias = NativeMusicPlayerPlugin.NOTIFICATION_PERMISSION)
    }
)
public class NativeMusicPlayerPlugin extends Plugin {
    static final String AUDIO_PERMISSION = "audio";
    static final String LEGACY_AUDIO_PERMISSION = "legacyAudio";
    static final String NOTIFICATION_PERMISSION = "notifications";

    private PluginCall pendingLibraryCall;

    @PluginMethod
    public void getLibrary(PluginCall call) {
        if (!hasAudioPermission()) {
            pendingLibraryCall = call;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                requestPermissionForAlias(AUDIO_PERMISSION, call, "libraryPermissionCallback");
            } else {
                requestPermissionForAlias(LEGACY_AUDIO_PERMISSION, call, "libraryPermissionCallback");
            }
            return;
        }

        resolveLibrary(call);
    }

    @PermissionCallback
    private void libraryPermissionCallback(PluginCall call) {
        PluginCall libraryCall = pendingLibraryCall != null ? pendingLibraryCall : call;
        pendingLibraryCall = null;

        if (!hasAudioPermission()) {
            libraryCall.reject("Audio permission was denied.");
            return;
        }

        resolveLibrary(libraryCall);
    }

    @PluginMethod
    public void play(PluginCall call) {
        String id = call.getString("id", "track");
        String title = call.getString("title", "Unknown track");
        String artist = call.getString("artist", "Unknown artist");
        String url = call.getString("url");

        if (url == null || url.trim().isEmpty()) {
            call.reject("Track URL is required.");
            return;
        }

        Intent intent = MusicPlaybackService.command(getContext(), MusicPlaybackService.ACTION_PLAY)
            .putExtra(MusicPlaybackService.EXTRA_TRACK_ID, id)
            .putExtra(MusicPlaybackService.EXTRA_TITLE, title)
            .putExtra(MusicPlaybackService.EXTRA_ARTIST, artist)
            .putExtra(MusicPlaybackService.EXTRA_URL, url);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            getContext().startForegroundService(intent);
        } else {
            getContext().startService(intent);
        }
        resolve(call, true, id);
    }

    @PluginMethod
    public void pause(PluginCall call) {
        getContext().startService(MusicPlaybackService.command(getContext(), MusicPlaybackService.ACTION_PAUSE));
        resolve(call, false, null);
    }

    @PluginMethod
    public void resume(PluginCall call) {
        getContext().startService(MusicPlaybackService.command(getContext(), MusicPlaybackService.ACTION_RESUME));
        resolve(call, true, null);
    }

    @PluginMethod
    public void stop(PluginCall call) {
        getContext().startService(MusicPlaybackService.command(getContext(), MusicPlaybackService.ACTION_STOP));
        resolve(call, false, null);
    }

    private void resolve(PluginCall call, boolean isPlaying, String trackId) {
        JSObject result = new JSObject();
        result.put("isPlaying", isPlaying);
        if (trackId != null) result.put("trackId", trackId);
        call.resolve(result);
    }

    private void resolveLibrary(PluginCall call) {
        JSObject result = new JSObject();
        JSArray tracks = new JSArray();

        String[] projection = new String[] {
            MediaStore.Audio.Media._ID,
            MediaStore.Audio.Media.TITLE,
            MediaStore.Audio.Media.ARTIST,
            MediaStore.Audio.Media.ALBUM,
            MediaStore.Audio.Media.DURATION
        };

        String selection = MediaStore.Audio.Media.IS_MUSIC + " != 0";
        String sortOrder = MediaStore.Audio.Media.TITLE + " COLLATE NOCASE ASC";

        try (Cursor cursor = getContext().getContentResolver().query(
            MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
            projection,
            selection,
            null,
            sortOrder
        )) {
            if (cursor != null) {
                int idColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID);
                int titleColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE);
                int artistColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST);
                int albumColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM);
                int durationColumn = cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION);

                while (cursor.moveToNext()) {
                    long mediaId = cursor.getLong(idColumn);
                    Uri contentUri = Uri.withAppendedPath(MediaStore.Audio.Media.EXTERNAL_CONTENT_URI, String.valueOf(mediaId));
                    JSObject track = new JSObject();
                    track.put("id", String.valueOf(mediaId));
                    track.put("title", valueOrDefault(cursor.getString(titleColumn), "Unknown title"));
                    track.put("artist", valueOrDefault(cursor.getString(artistColumn), "Unknown artist"));
                    track.put("album", valueOrDefault(cursor.getString(albumColumn), "Device music"));
                    track.put("durationMs", cursor.getLong(durationColumn));
                    track.put("duration", formatDuration(cursor.getLong(durationColumn)));
                    track.put("url", contentUri.toString());
                    track.put("isDeviceTrack", true);
                    tracks.put(track);
                }
            }
        }

        result.put("tracks", tracks);
        call.resolve(result);
    }

    private boolean hasAudioPermission() {
        String permission = Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU
            ? Manifest.permission.READ_MEDIA_AUDIO
            : Manifest.permission.READ_EXTERNAL_STORAGE;
        return ContextCompat.checkSelfPermission(getContext(), permission) == PackageManager.PERMISSION_GRANTED;
    }

    private String formatDuration(long durationMs) {
        long totalSeconds = Math.max(0, durationMs / 1000);
        long minutes = totalSeconds / 60;
        long seconds = totalSeconds % 60;
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    private String valueOrDefault(String value, String fallback) {
        return value == null || value.trim().isEmpty() || "<unknown>".equals(value) ? fallback : value;
    }
}
