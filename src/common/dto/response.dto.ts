export class ApiResponseDto<T> {
    success: boolean;
    data: T | null;
    error?: string;
  
    constructor(success: boolean, data: T | null, error?: string) {
      this.success = success;
      this.data = data;
      if (error) this.error = error;
    }
  }
  