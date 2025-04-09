"use client";
import {
  NotificationSettingsFormData,
  notificationSettingsSchema,
} from "@/lib/schemas";
import { useUpdateUserMutation } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "./header";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { CustomFormField } from "./CustomFormField";

const SharedNotificationSettings = ({
  title = "Notification Settings",
  subtitle = "Manage your notification settings",
}: SharedNotificationSettingsProps) => {
  const { user } = useUser();
  const [updateUser] = useUpdateUserMutation(); // This is a custom hook to update user data

  const currentSettings =
    (user?.publicMetadata as { settings?: UserSettings })?.settings || {};

  // Initialize the form with current default values
  const methods = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency: currentSettings.notificationFrequency || "daily",
    },
  });

  // Handle form submission
  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!user) return;

    const updatedUser = {
      userId: user.id,
      publicMetadata: {
        ...user.publicMetadata,
        settings: {
          ...currentSettings,
          ...data, // new data
        },
      },
    };

    try {
      await updateUser(updatedUser);
    } catch (error) {
      console.error("Failed to update user settings: ", error);
    }
  };

  if (!user) return <div>Please sign in to manage your settings.</div>;

  return (
    <div className="notification-settings">
      <Header title={title} subtitle={subtitle} />
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="notification-settings__form"
        >
          <div className="notification-settings__fields">
            <CustomFormField
              name="courseNotifications"
              label="Course Notifications"
              type="switch"
            />
            <CustomFormField
              name="emailAlerts"
              label="Email Alerts"
              type="switch"
            />
            <CustomFormField
              name="smsAlerts"
              label="SMS Alerts"
              type="switch"
            />

            <CustomFormField
              name="notificationFrequency"
              label="Notification Frequency"
              type="select"
              options={[
                { value: "immediate", label: "Immediate" },
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
              ]}
            />
          </div>

          <Button type="submit" className="notification-settings__submit">
            Update Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SharedNotificationSettings;
