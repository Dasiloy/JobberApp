import { TCurrency } from "@/types/currency.type";
import { Dimensions, Platform } from "react-native";

export class Util {
  private static instance: Util | null = null;

  constructor() {
    if (Util.instance) {
      return Util.instance;
    }
    Util.instance = this;
  }

  isAll(...args: any[]) {
    return args.every((arg) => !!arg);
  }

  isSome(...args: any[]) {
    return args.some((arg) => !!arg);
  }

  uniquefy<T extends object, K extends keyof T>(arr: T[], key: K) {
    return arr.filter((v, i, a) => a.findIndex((t) => t[key] === v[key]) === i);
  }

  removeWhiteSpacesInBetweenStrings(str: string) {
    return str.replace(/\s\s+/g, " ");
  }

  gen16DigitRandomNumberToString() {
    return Math.floor(
      1000000000000000 + Math.random() * 9000000000000000
    ).toString();
  }

  cropText(text = "", length = 20) {
    return text.length > length ? text.slice(0, length) + "..." : text;
  }

  getInitials(name: string) {
    return name
      .split(" ")
      .map((n) => n?.[0] || "")
      .join("")
      .substring(0, 2);
  }

  createHexColor(initials = "") {
    const hash = initials
      .split("")
      .reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const color = `#${((hash & 0x00ffffff) | 0x883333)
      .toString(16)
      .toUpperCase()}`;
    return color;
  }

  createTimerPromise<T extends (...args: any[]) => any>(fn: T, delay = 1000) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fn());
      }, delay);
    });
  }

  formatCurrency(amount: number | string, currency: TCurrency = "NGN") {
    if (typeof amount === "string") amount = parseFloat(amount);
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
    }).format(amount) as any;
  }

  formatNumber(num: number | string) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  removeCommas(num: number | string) {
    return num.toString().replace(/,/g, "");
  }

  toDecimal(num: number | string, decimalPlaces = 2) {
    return parseFloat(num.toString().replace(",", "")).toFixed(decimalPlaces);
  }

  capitalizeWords(str?: string) {
    if (!str) return "";
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = window.crypto.getRandomValues(new Uint8Array(1))[0] & 15;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getGridWidth(numColumns: number, gap: number) {
    const spacing =
      Platform.select({
        default: 40, // android px-5
        ios: 32, // ios px-4
      }) +
      (numColumns - 1) * gap;

    return (Dimensions.get("window").width - spacing) / numColumns;
  }
}

export const util = new Util();
