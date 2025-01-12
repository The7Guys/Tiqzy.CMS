import { onMounted } from 'vue'

/**
 * Composable function that provides controls for showing and hiding a loading overlay.
 *
 * The `useLoading` function initializes the loading overlay element on mount and returns
 * methods to show or hide it.
 *
 * @returns {Object} An object containing:
 * - show: A function to display the loading overlay.
 * - hide: A function to hide the loading overlay.
 *
 * @example
 * const loading = useLoading();
 * loading.show(); // Show the loading overlay
 * loading.hide(); // Hide the loading overlay
 */
export const useLoading = () => {
  let overlay = null

  onMounted(() => {
    overlay = document.getElementById('global-loading-overlay')
  })

  /**
   * Show the loading overlay.
   *
   * @function show
   */
  const show = () => {
    overlay.style.display = 'flex'
  }

  /**
   * Hide the loading overlay.
   *
   * @function hide
   */
  const hide = () => {
    overlay.style.display = 'none'
  }

  return { show, hide }
}
