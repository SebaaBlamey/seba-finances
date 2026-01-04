"use client";

import { Button, Card, Input } from "@heroui/react";

export default function TestPage() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Test HeroUI</h1>
        
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Test Card</h2>
          
          <Input 
            label="Email"
            placeholder="Enter your email"
            className="mb-4"
          />
          
          <Button color="primary">
            Test Button
          </Button>
        </Card>
        
        <div className="bg-blue-500 text-white p-4 rounded">
          Test Tailwind Colors
        </div>
      </div>
    </div>
  );
}