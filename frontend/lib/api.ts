const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  getProfile: async (token: string) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  updateProfile: async (
    token: string,
    payload: { name?: string; email?: string; phone?: string; address?: string }
  ) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  // Admin - Users
  listUsers: async (token: string, params?: { search?: string }) => {
    const qs = params?.search
      ? `?search=${encodeURIComponent(params.search)}`
      : "";
    const response = await fetch(`${API_URL}/users${qs}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
  createUser: async (
    token: string,
    payload: {
      name: string;
      email: string;
      password: string;
      role?: "user" | "admin";
    }
  ) => {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  },
  deleteUser: async (token: string, id: string) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  // Products
  getProducts: async (params?: {
    category?: string;
    status?: string;
    search?: string;
  }) => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    const response = await fetch(`${API_URL}/products${queryString}`);
    return response.json();
  },

  getProductById: async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },

  createProduct: async (
    token: string,
    payload: {
      name: string;
      brand: string;
      description: string;
      price: number;
      category: string;
      stock: number;
      images: string[];
      specifications: Record<string, string>;
    }
  ) => {
    const response = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  // Orders
  createOrder: async (orderData: any, token: string) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  getOrders: async (
    token: string,
    params?: { status?: string; dateRange?: string }
  ) => {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    const response = await fetch(`${API_URL}/orders${queryString}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getOrderById: async (id: string, token: string) => {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  updateOrderStatus: async (id: string, status: string, token: string) => {
    const response = await fetch(`${API_URL}/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  cancelOrder: async (id: string, token: string) => {
    const response = await fetch(`${API_URL}/orders/${id}/cancel`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
