package com.pocketbeats.player;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.IBinder;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import java.io.IOException;

public class MusicPlaybackService extends Service {
    public static final String ACTION_PLAY = "com.pocketbeats.player.PLAY";
    public static final String ACTION_PAUSE = "com.pocketbeats.player.PAUSE";
    public static final String ACTION_RESUME = "com.pocketbeats.player.RESUME";
    public static final String ACTION_STOP = "com.pocketbeats.player.STOP";
    public static final String EXTRA_TRACK_ID = "trackId";
    public static final String EXTRA_TITLE = "title";
    public static final String EXTRA_ARTIST = "artist";
    public static final String EXTRA_URL = "url";

    private static final String CHANNEL_ID = "music_playback";
    private static final int NOTIFICATION_ID = 2042;

    private MediaPlayer mediaPlayer;
    private AudioManager audioManager;
    private AudioFocusRequest focusRequest;
    private String title = "Pocket Beats";
    private String artist = "Ready to play";
    private String trackId = "";
    private String currentUrl = "";
    private boolean isPlaying;

    public static Intent command(Context context, String action) {
        return new Intent(context, MusicPlaybackService.class).setAction(action);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        audioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
        createNotificationChannel();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent == null || intent.getAction() == null) return START_NOT_STICKY;

        String action = intent.getAction();
        if (ACTION_PLAY.equals(action)) {
            play(intent);
        } else if (ACTION_PAUSE.equals(action)) {
            pause();
        } else if (ACTION_RESUME.equals(action)) {
            resume();
        } else if (ACTION_STOP.equals(action)) {
            stopPlayback();
        }

        return START_STICKY;
    }

    private void play(Intent intent) {
        String url = intent.getStringExtra(EXTRA_URL);
        if (url == null || url.trim().isEmpty()) return;

        trackId = intent.getStringExtra(EXTRA_TRACK_ID);
        title = valueOrDefault(intent.getStringExtra(EXTRA_TITLE), "Unknown track");
        artist = valueOrDefault(intent.getStringExtra(EXTRA_ARTIST), "Unknown artist");
        currentUrl = url;

        startForeground(NOTIFICATION_ID, buildNotification(true));
        prepareAndStart(url);
    }

    private void prepareAndStart(String url) {
        releasePlayer();
        mediaPlayer = new MediaPlayer();
        mediaPlayer.setAudioAttributes(new AudioAttributes.Builder()
            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
            .setUsage(AudioAttributes.USAGE_MEDIA)
            .build());
        mediaPlayer.setOnPreparedListener(player -> {
            if (requestAudioFocus()) {
                player.start();
                isPlaying = true;
                updateNotification();
            }
        });
        mediaPlayer.setOnCompletionListener(player -> {
            isPlaying = false;
            updateNotification();
        });
        mediaPlayer.setOnErrorListener((player, what, extra) -> {
            isPlaying = false;
            stopForeground(false);
            updateNotification();
            return true;
        });

        try {
            mediaPlayer.setDataSource(url);
            mediaPlayer.prepareAsync();
        } catch (IOException | IllegalArgumentException error) {
            isPlaying = false;
            stopForeground(false);
            updateNotification();
        }
    }

    private void pause() {
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
            isPlaying = false;
            abandonAudioFocus();
            updateNotification();
        }
    }

    private void resume() {
        if (mediaPlayer == null && !currentUrl.isEmpty()) {
            prepareAndStart(currentUrl);
            return;
        }

        if (mediaPlayer != null && requestAudioFocus()) {
            mediaPlayer.start();
            isPlaying = true;
            updateNotification();
        }
    }

    private void stopPlayback() {
        isPlaying = false;
        abandonAudioFocus();
        releasePlayer();
        stopForeground(true);
        stopSelf();
    }

    private Notification buildNotification(boolean playing) {
        Intent appIntent = new Intent(this, MainActivity.class);
        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, appIntent, immutableFlag());
        PendingIntent pauseIntent = PendingIntent.getService(this, 1, command(this, ACTION_PAUSE), immutableFlag());
        PendingIntent resumeIntent = PendingIntent.getService(this, 2, command(this, ACTION_RESUME), immutableFlag());
        PendingIntent stopIntent = PendingIntent.getService(this, 3, command(this, ACTION_STOP), immutableFlag());

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_media_play)
            .setContentTitle(title)
            .setContentText(artist)
            .setContentIntent(contentIntent)
            .setOngoing(playing)
            .setOnlyAlertOnce(true)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setStyle(new androidx.media.app.NotificationCompat.MediaStyle().setShowActionsInCompactView(0, 1));

        if (playing) {
            builder.addAction(android.R.drawable.ic_media_pause, "Pause", pauseIntent);
        } else {
            builder.addAction(android.R.drawable.ic_media_play, "Play", resumeIntent);
        }
        builder.addAction(android.R.drawable.ic_menu_close_clear_cancel, "Stop", stopIntent);
        return builder.build();
    }

    private void updateNotification() {
        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        manager.notify(NOTIFICATION_ID, buildNotification(isPlaying));
    }

    private boolean requestAudioFocus() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            focusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                .setAudioAttributes(new AudioAttributes.Builder()
                    .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                    .setUsage(AudioAttributes.USAGE_MEDIA)
                    .build())
                .build();
            return audioManager.requestAudioFocus(focusRequest) == AudioManager.AUDIOFOCUS_REQUEST_GRANTED;
        }
        return audioManager.requestAudioFocus(null, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN) == AudioManager.AUDIOFOCUS_REQUEST_GRANTED;
    }

    private void abandonAudioFocus() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && focusRequest != null) {
            audioManager.abandonAudioFocusRequest(focusRequest);
        } else {
            audioManager.abandonAudioFocus(null);
        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Music playback", NotificationManager.IMPORTANCE_LOW);
        channel.setDescription("Playback controls for Pocket Beats");
        NotificationManager manager = getSystemService(NotificationManager.class);
        manager.createNotificationChannel(channel);
    }

    private int immutableFlag() {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.M ? PendingIntent.FLAG_IMMUTABLE : 0;
    }

    private String valueOrDefault(String value, String fallback) {
        return value == null || value.trim().isEmpty() ? fallback : value;
    }

    private void releasePlayer() {
        if (mediaPlayer != null) {
            mediaPlayer.release();
            mediaPlayer = null;
        }
    }

    @Override
    public void onDestroy() {
        abandonAudioFocus();
        releasePlayer();
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
