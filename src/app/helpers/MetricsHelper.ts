// tslint:disable-next-line:no-unnecessary-class
import autobind from "autobind-decorator";
import {TNote} from "./MidiHelper";
interface IStatistics {
  key: TNote;
  correct: number;
  incorrect: number;
}

export class MetricsHelper {
  private keys: Set<TNote> = new Set<TNote>();
  public static clear(): void {
    localStorage.clear();
  }
  private static setMetrics(key: string, value: number): void {
    localStorage.setItem(`metrics.${key}`, value.toString());
  }
  private static getMetrics(key: string): number {
    const value = parseInt(localStorage.getItem(`metrics.${key}`), 10);
    if (isNaN(value)) {
      return 0;
    }
    return value;
  }

  @autobind
  public getStatistics(): IStatistics[] {
    return Array.from(this.keys).map((x) => {
      const correct = this.getCorrect(x);
      const incorrect = this.getIncorrect(x);
      return {key: x, correct, incorrect};
    });
  }

  @autobind
  public correct(key: TNote): void {
    this.keys.add(key);
    this.setCorrect(key, this.getCorrect(key) + 1);
  }

  @autobind
  public incorrect(key: TNote): void {
    this.keys.add(key);
    this.setIncorrect(key, this.getIncorrect(key) + 1);
  }

  @autobind
  public getCorrect(key: string): number {
    return MetricsHelper.getMetrics(`correct.${key}`);
  }

  @autobind
  public getIncorrect(key: string): number {
    return MetricsHelper.getMetrics(`incorrect.${key}`);
  }

  @autobind
  private setCorrect(key: string, value: number): void {
    MetricsHelper.setMetrics(`correct.${key}`, value);
  }

  @autobind
  private setIncorrect(key: string, value: number): void {
    MetricsHelper.setMetrics(`incorrect.${key}`, value);
  }
}
