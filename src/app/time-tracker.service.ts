// time-tracker.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeTrackerService {
  private propertyTimers: Map<string, { lockTimestamp: number; remainingTime: string }> = new Map();

  setLockTimestamp(propertyId: string, lockTimestamp: number): void {
    this.propertyTimers.set(propertyId, { lockTimestamp, remainingTime: '' });
  }

  getLockTimestamp(propertyId: string): number | undefined {
    const timer = this.propertyTimers.get(propertyId);
    return timer?.lockTimestamp;
  }

  setRemainingTime(propertyId: string, remainingTime: string): void {
    const timer = this.propertyTimers.get(propertyId);
    if (timer) {
      timer.remainingTime = remainingTime;
    }
  }

  getRemainingTime(propertyId: string): string {
    const timer = this.propertyTimers.get(propertyId);
    return timer?.remainingTime || '';
  }

  clearTimer(propertyId: string): void {
    this.propertyTimers.delete(propertyId);
  }
}
