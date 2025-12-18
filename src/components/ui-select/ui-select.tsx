/**
 * Select Component
 *
 * This is a convenience alias for FormGroup.
 * When you pass children (option elements), FormGroup automatically renders as a select.
 * For new code, prefer using FormGroup directly.
 *
 * @example
 * // These are equivalent:
 * <Select label="Country" name="country">
 *   <option value="">Select</option>
 *   <option value="us">United States</option>
 * </Select>
 *
 * <FormGroup label="Country" name="country">
 *   <option value="">Select</option>
 *   <option value="us">United States</option>
 * </FormGroup>
 */
export { default, default as Select } from "../ui-form-group/ui-form-group";
