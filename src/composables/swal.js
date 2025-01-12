import Swal from 'sweetalert2'

/**
 * Composable function that provides predefined SweetAlert2 methods.
 *
 * The `useSwal` function offers methods for displaying various types of alerts:
 * - `success`: Fires a success alert with customizable options.
 * - `error`: Fires an error alert with customizable options.
 * - `warning`: Fires a warning alert with customizable options.
 */
export const useSwal = () => {
  /**
   * Triggers a SweetAlert2 popup with the specified configuration.
   *
   * @param {Object} data - An object containing options for the alert.
   * Options may include:
   * - title {string}: The title of the alert.
   * - text {string}: The message text of the alert.
   * - icon {string}: The icon to display in the alert (e.g., 'success', 'error', 'warning', etc.).
   * - [any other SweetAlert2 option]: Additional configuration options for the alert.
   *
   * @returns {Promise} A promise that resolves when the alert is closed.
   *
   * @example
   * fire({ title: 'Hello World', text: 'This is a custom alert!', icon: 'info' })
   */
  const fire = (data) => {
    return Swal.fire(data)
  }

  /**
   * A predefined SweetAlert2 method for firing a success alert.
   *
   * @param {Object} data An object that contains the options for the alert.
   * Options include:
   * - title {string}: The title of the success message. Defaults to 'Success'.
   * - text {string}: The text of the success message.
   * - icon {string}: The icon to use for the success message. Defaults to 'success'.
   *
   * @example
   * useSwal().success({ title: 'Operation Completed', text: 'The operation was successful.' })
   */
  const success = (data) => {
    data = {
      title: 'Success',
      icon: 'success',
      ...data,
    }

    return fire(data)
  }

  /**
   * A predefined SweetAlert2 method for firing an error alert.
   *
   * @param {Object} data An object that contains the options for the alert.
   * Options include:
   * title {string} The title of the error message.
   * text {string} The text of the error message.
   * icon {string} The icon to use for the error message.
   *
   * @example
   * useSwal().error({ title: 'Not Found', text: 'The user you are trying to update does not exist' })
   */
  const error = (data) => {
    data = {
      title: 'Error',
      text: 'Something went wrong',
      icon: 'error',
      ...data,
    }

    return fire(data)
  }

  /**
   * A predefined SweetAlert2 method for firing a warning alert.
   *
   * @param {Object} data An object that contains the options for the alert.
   * Options include:
   * - title {string}: The title of the warning message. Defaults to 'Warning'.
   * - text {string}: The text of the warning message.
   * - icon {string}: The icon to use for the warning message. Defaults to 'warning'.
   *
   * @example
   * useSwal().warning({ title: 'Low Disk Space', text: 'Your disk space is running low.' })
   */
  const warning = (data) => {
    data = {
      title: 'Warning',
      icon: 'warning',
      ...data,
    }

    return fire(data)
  }

  return { success, error, warning }
}
