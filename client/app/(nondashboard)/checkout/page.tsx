"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

import CheckoutDetailsPage from "./details";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import WizardStepper from "@/components/wizard-stepper";
import Loading from "@/components/dancing";
import PaymentPage from "./payment";
import CompletionPage from "./completion";

const CheckoutWizard = () => {
  const { isLoaded } = useUser();
  const { checkoutStep } = useCheckoutNavigation();

  if (!isLoaded) return <Loading />;

  // Function to render the appropriate step based on the current checkout step
  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetailsPage />;
      case 2:
        return <PaymentPage />;
      case 3:
        return <CompletionPage />;
      default:
        return <CheckoutDetailsPage />;
    }
  };

  return (
    <div className="checkout">
      <WizardStepper currentStep={checkoutStep} />
      <div className="checkout__content">{renderStep()}</div>
    </div>
  );
};

export default CheckoutWizard;
