// Type definitions
export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  }
  
  export interface Tower {
    id: number;
    latitude: number;
    longitude: number;
    user_id: number;
    user: User;
  }
  
  export interface Coordinates {
    latitude: number;
    longitude: number;
  }