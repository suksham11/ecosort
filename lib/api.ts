// lib/api.ts
// Client-side API utilities for interacting with backend

export interface WasteClassificationData {
  wasteType: 'biodegradable' | 'recyclable' | 'hazardous' | 'unknown';
  confidence: number;
  imageUrl?: string;
  userId?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  weight?: number;
  barcodeData?: string;
}

export interface TruckLocationData {
  truckId: string;
  truckName: string;
  latitude: number;
  longitude: number;
  status?: 'active' | 'inactive' | 'maintenance';
  wasteLoad: number;
  wasteType: 'biodegradable' | 'recyclable' | 'hazardous' | 'mixed';
  route?: string;
  speed?: number;
}

export interface UserData {
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  role?: 'user' | 'admin' | 'collector';
}

export interface WasteCollectionData {
  userId: string;
  truckId: string;
  wasteType: 'biodegradable' | 'recyclable' | 'hazardous' | 'mixed';
  weight: number;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  collectionDate: Date;
  notes?: string;
}

// Waste Classifications API
export const saveWasteClassification = async (data: WasteClassificationData) => {
  const response = await fetch('/api/waste-classifications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to save classification');
  return response.json();
};

export const getWasteClassifications = async (params?: {
  userId?: string;
  wasteType?: string;
  limit?: number;
}) => {
  const searchParams = new URLSearchParams();
  if (params?.userId) searchParams.set('userId', params.userId);
  if (params?.wasteType) searchParams.set('wasteType', params.wasteType);
  if (params?.limit) searchParams.set('limit', params.limit.toString());

  const response = await fetch(`/api/waste-classifications?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch classifications');
  return response.json();
};

export const getWasteStats = async (userId?: string) => {
  const searchParams = userId ? `?userId=${userId}` : '';
  const response = await fetch(`/api/waste-classifications/stats${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};

// Truck Tracking API
export const updateTruckLocation = async (data: TruckLocationData) => {
  const response = await fetch('/api/trucks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update truck location');
  return response.json();
};

export const getTrucks = async (params?: { status?: string; truckId?: string }) => {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.set('status', params.status);
  if (params?.truckId) searchParams.set('truckId', params.truckId);

  const response = await fetch(`/api/trucks?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch trucks');
  return response.json();
};

// User Management API
export const createUser = async (data: UserData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};

export const getUsers = async (params?: { email?: string; role?: string }) => {
  const searchParams = new URLSearchParams();
  if (params?.email) searchParams.set('email', params.email);
  if (params?.role) searchParams.set('role', params.role);

  const response = await fetch(`/api/users?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

// Waste Collection API
export const createWasteCollection = async (data: WasteCollectionData) => {
  const response = await fetch('/api/waste-collections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create collection request');
  return response.json();
};

export const getWasteCollections = async (params?: {
  userId?: string;
  truckId?: string;
  status?: string;
  limit?: number;
}) => {
  const searchParams = new URLSearchParams();
  if (params?.userId) searchParams.set('userId', params.userId);
  if (params?.truckId) searchParams.set('truckId', params.truckId);
  if (params?.status) searchParams.set('status', params.status);
  if (params?.limit) searchParams.set('limit', params.limit.toString());

  const response = await fetch(`/api/waste-collections?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch collections');
  return response.json();
};
