'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function TestPage() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Test Page</h1>
        <p className="text-gray-600">If you can see this, DashboardLayout is working!</p>
      </div>
    </DashboardLayout>
  );
}