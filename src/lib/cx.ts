/**
 * Class name utility function
 * 
 * Combines multiple class names into a single string, filtering out falsy values.
 * This is a lightweight alternative to libraries like classnames or clsx.
 * 
 * @example
 * cx('btn', isActive && 'active', 'rounded')
 * // Returns: 'btn active rounded'
 * 
 * @example
 * cx('text-base', undefined, null, false, 'font-bold')
 * // Returns: 'text-base font-bold'
 */
export function cx(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

