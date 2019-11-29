import { PeriodInstance } from '../utilities/period-instance.utility';
import { PeriodType } from './period-type';

/**
 * @description
 * Period class offers capabilities to get periods for different period types
 */
export class Period {
  private _calendarId: string;
  private _periodType: PeriodType;
  private _type: string;
  private _year: number;
  private _preferences: any;
  private _periods: any[];
  private _currentYear: number;
  constructor() {
    this._calendarId = 'gregorian';

    this._periodType = new PeriodType();

    if (!this._periodType) {
      throw new Error('Could not instantiate period type');
    }
  }

  /**
   * Set period type
   * @param {string} type
   */
  setType(type: string) {
    if (!this._periodType.isValid(type)) {
      throw new Error('Not a valid period type');
    }

    this._type = type;
    return this;
  }

  setYear(year: number) {
    this._year = year;
    return this;
  }

  setCalendar(calendarId: string) {
    this._calendarId = calendarId;
    return this;
  }

  setPreferences(preferences: any) {
    this._preferences = preferences;
    return this;
  }

  get() {
    if (this._type) {
      const periodInstance: PeriodInstance = new PeriodInstance(
        this._calendarId,
        this._type,
        this._preferences,
        this._year
      );

      this._periods = periodInstance.get();

      this._year = periodInstance.year();

      this._currentYear = periodInstance.currentYear();
    }
    return this;
  }

  type() {
    return this._type;
  }

  list() {
    return this._periods;
  }

  year() {
    return this._year;
  }

  currentYear() {
    return this._currentYear;
  }
}
