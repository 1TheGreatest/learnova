declare global {
  interface Course {
    courseId: string;
    teacherId: string;
    teacherName: string;
    title: string;
    description?: string;
    category: string;
    image?: string;
    price?: number; // Stored in cents (e.g., 4999 for $49.99)
    level: "Beginner" | "Intermediate" | "Advanced";
    status: "Draft" | "Published";
    sections: Section[];
    enrollments?: Array<{
      userId: string;
    }>;
  }

  interface SearchCourseCardProps {
    course: Course;
    isSelected?: boolean;
    onClick?: () => void;
  }

  interface SelectedCourseProps {
    course: Course;
    handleEnrollNow: (courseId: string) => void;
  }

  interface AccordionSectionsProps {
    sections: Section[];
  }

  interface HeaderProps {
    title: string;
    subtitle: string;
    rightElement?: ReactNode;
  }

  interface SharedNotificationSettingsProps {
    title?: string;
    subtitle?: string;
  }

  interface UserSettings {
    theme?: "light" | "dark";
    emailAlerts?: boolean;
    smsAlerts?: boolean;
    courseNotifications?: boolean;
    notificationFrequency?: "immediate" | "daily" | "weekly";
  }

  interface Transaction {
    userId: string;
    transactionId: string;
    dateTime: string;
    courseId: string;
    paymentProvider: "stripe";
    paymentMethodId?: string;
    amount: number; // Stored in cents
    savePaymentMethod?: boolean;
  }

  interface WizardStepperProps {
    currentStep: number;
  }

  interface CoursePreviewProps {
    course: Course;
  }
}

export {};
