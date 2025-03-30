"use client";
import React from "react";
import { CheckCircle2, Package, Truck, Home } from "lucide-react";

const OrderTracking = () => {
  // This would come from your backend
  const orderStatus = {
    orderId: "ORD-2024-001",
    status: "in_transit",
    stages: [
      {
        id: "order_placed",
        title: "Order Placed",
        description: "Your order has been placed successfully",
        status: "completed",
        date: "2024-03-20 10:30 AM",
      },
      {
        id: "processing",
        title: "Processing",
        description: "Your order is being processed",
        status: "completed",
        date: "2024-03-20 02:45 PM",
      },
      {
        id: "shipped",
        title: "Shipped",
        description: "Your order has been shipped",
        status: "current",
        date: "2024-03-21 09:15 AM",
      },
      {
        id: "delivered",
        title: "Delivered",
        description: "Your order has been delivered",
        status: "pending",
        date: "Pending",
      },
    ],
    deliveryAddress: "123 Main St, Colombo, Sri Lanka",
    estimatedDelivery: "2024-03-22",
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case "current":
        return <Truck className="w-6 h-6 text-orange-500" />;
      case "pending":
        return <Package className="w-6 h-6 text-gray-400" />;
      default:
        return <Package className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Order Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Order Tracking
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Order ID: {orderStatus.orderId}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Estimated Delivery
              </p>
              <p className="text-lg font-semibold text-orange-600">
                {orderStatus.estimatedDelivery}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {orderStatus.stages.map((stage, index) => (
                <div key={stage.id} className="relative pl-12">
                  {/* Status Icon */}
                  <div className="absolute left-4 -mt-1">
                    {getStatusIcon(stage.status)}
                  </div>

                  {/* Content */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {stage.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {stage.description}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {stage.date}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="mt-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          stage.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : stage.status === "current"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {stage.status.charAt(0).toUpperCase() +
                          stage.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <Home className="w-6 h-6 text-gray-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delivery Address
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {orderStatus.deliveryAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
