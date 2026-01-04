"use client";

import { Button, Card, Input } from "@heroui/react";

export default function TestPage() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-display-small text-on-surface">Test Material 3</h1>
        
        <Card className="p-4 bg-surface-container shadow-md rounded-[16px]">
          <h2 className="text-headline-small text-on-surface mb-4">Test Card</h2>
          
          <Input 
            label="Email"
            placeholder="Enter your email"
            className="mb-4"
            variant="flat"
            radius="sm"
          />
          
          <Button color="primary" radius="full">
            Test Button
          </Button>
        </Card>
        
        <div className="bg-primary text-on-primary p-4 rounded-[12px]">
          Test Tailwind Colors (Primary)
        </div>
      </div>
    </div>
  );
}
