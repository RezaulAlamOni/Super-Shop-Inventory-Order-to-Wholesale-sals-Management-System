<?php

namespace App\Traits;

trait CanAssertFlash
{
    protected function assertFlash($level, $message, $important = false, $title = null, $overlay = false)
    {
        $expectedNotification = [
            'title' => $title,
            'message' => $message,
            'level' => $level,
            'important' => $important,
            'overlay' => $overlay
        ];

        $flashNotifications = json_decode(json_encode(session('flash_notification')), true);
        if (! $flashNotifications) {
            $this->fail('Failed asserting that a flash message was sent.');
        }

        $this->assertContains(
            $expectedNotification,
            $flashNotifications,
            "Failed asserting that the flash message '$message' is present."
        );
    }
}