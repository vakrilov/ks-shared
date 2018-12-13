///////////////////
// Auto-generated
// Do not edit!!!
///////////////////
export class Notification {
  constructor(
    /**
     * The message being displayed by the notification
     */
    public message: string,
    /**
     * The type of the notification specifies its appearance
     */
    public type: 'success' | 'info' | 'error',
    /**
     * Auto-hides the notification after the specified amount of time in
     * milliseconds. If set to 0, the notification never auto-hides.
     * @default 5000ms
     */
    public timeout: number = 5000
  ) {}
}
