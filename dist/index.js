// src/index.ts
import"./styles/index.css";

// src/lib/cx.ts
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// src/components/material-icon/material-icon.tsx
import { jsxDEV } from "react/jsx-dev-runtime";
function MaterialIcon({
  name,
  variant = "outlined",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV("span", {
    ...props,
    className: cx("material-symbols-outlined", "text-[16px] leading-none", variant === "filled" && "icon-filled", className),
    "aria-hidden": "true",
    children: name
  }, undefined, false, undefined, this);
}
// src/components/ui-badge/ui-badge.tsx
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var variantClasses = {
  "status-active": "bg-active-bg dark:bg-green-900/30 text-active-green dark:text-green-400 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase border border-green-100 dark:border-green-900",
  gift: "bg-accent-purple text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 uppercase shadow-sm",
  "active-gifted": "bg-gradient-to-r from-accent-purple to-purple-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 uppercase"
};
function Badge({
  variant,
  iconName,
  iconFilled,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxDEV2("span", {
    ...props,
    className: cx(variantClasses[variant], className),
    children: [
      iconName ? /* @__PURE__ */ jsxDEV2(MaterialIcon, {
        name: iconName,
        variant: iconFilled ? "filled" : "outlined",
        className: "text-[14px]"
      }, undefined, false, undefined, this) : null,
      children
    ]
  }, undefined, true, undefined, this);
}
// src/components/ui-button/ui-button.tsx
import { jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var variantClasses2 = {
  primary: "bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 text-sm uppercase tracking-wide",
  secondary: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-text-light dark:text-text-dark text-xs font-bold py-2 px-5 rounded-md transition-colors uppercase tracking-wide",
  pill: "bg-primary hover:bg-secondary text-white text-xs font-bold py-2 px-5 rounded-full flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg transform active:scale-95",
  "small-pill": "bg-primary hover:bg-secondary text-white text-[10px] font-bold py-1.5 px-4 rounded-full flex items-center gap-1 transition-all shadow hover:shadow-md",
  link: "text-primary hover:text-secondary font-bold text-xs uppercase tracking-wide underline decoration-2 underline-offset-4",
  ghost: "text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark px-4 py-2 transition-colors hover:bg-background-light dark:hover:bg-background-dark rounded-lg cursor-pointer"
};
function Button({
  variant = "primary",
  iconLeading,
  className,
  children,
  type = "button",
  ...props
}) {
  return /* @__PURE__ */ jsxDEV3("button", {
    type,
    ...props,
    className: cx(variantClasses2[variant], className),
    children: [
      iconLeading ? iconLeading : null,
      children
    ]
  }, undefined, true, undefined, this);
}
// src/components/ui-theme-toggle/ui-theme-toggle.tsx
import { useEffect, useMemo, useState } from "react";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
"use client";
var THEME_COOKIE_NAME = "theme";
function getInitialTheme() {
  if (typeof window === "undefined")
    return "light";
  const stored = window.localStorage.getItem(THEME_COOKIE_NAME);
  if (stored === "dark" || stored === "light")
    return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}
function applyTheme(mode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
  document.documentElement.style.colorScheme = mode;
}
function persistTheme(mode) {
  window.localStorage.setItem(THEME_COOKIE_NAME, mode);
  document.cookie = `${THEME_COOKIE_NAME}=${mode}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
function ThemeToggle({ className }) {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";
  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    persistTheme(initial);
  }, []);
  const label = useMemo(() => isDark ? "Switch to light mode" : "Switch to dark mode", [isDark]);
  return /* @__PURE__ */ jsxDEV4("button", {
    type: "button",
    title: "Toggle Theme",
    "aria-label": label,
    "aria-pressed": isDark,
    onClick: () => {
      const next = isDark ? "light" : "dark";
      setTheme(next);
      persistTheme(next);
      applyTheme(next);
    },
    className: cx("bg-gray-100 dark:bg-gray-800 w-10 h-10 inline-flex items-center justify-center rounded-full text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors", className),
    children: /* @__PURE__ */ jsxDEV4(MaterialIcon, {
      name: "contrast",
      className: "text-[20px]"
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}

// src/components/ui-header/ui-header.tsx
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
"use client";
function Header({ brand, rightSlot }) {
  return /* @__PURE__ */ jsxDEV5("header", {
    className: "w-full px-8 py-5 flex justify-between items-center bg-card-light dark:bg-card-dark border-b border-border-light dark:border-border-dark sticky top-0 z-50",
    children: [
      brand ?? /* @__PURE__ */ jsxDEV5("div", {
        className: "flex items-center gap-4",
        children: [
          /* @__PURE__ */ jsxDEV5("div", {
            className: "flex flex-col items-center justify-center font-heading font-black text-2xl tracking-tight leading-none text-text-light dark:text-white",
            children: [
              /* @__PURE__ */ jsxDEV5("span", {
                children: "VOLCANICA"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV5("span", {
                className: "text-[0.6rem] tracking-[0.3em] font-bold text-text-muted-light dark:text-text-muted-dark uppercase mt-0.5",
                children: "Coffee Company"
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsxDEV5("div", {
            className: "h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV5("span", {
            className: "font-bold text-sm uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark",
            children: "UI Library"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsxDEV5("div", {
        children: rightSlot ?? /* @__PURE__ */ jsxDEV5(ThemeToggle, {}, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
// src/components/ui-page-shell/ui-page-shell.tsx
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
function PageShell({ children, header }) {
  return /* @__PURE__ */ jsxDEV6("div", {
    className: "bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen transition-colors duration-200 antialiased",
    children: [
      header ?? null,
      /* @__PURE__ */ jsxDEV6("main", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 space-y-20",
        children
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
// src/components/ui-section-header/ui-section-header.tsx
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
function SectionHeader({ icon, title, trailing }) {
  return /* @__PURE__ */ jsxDEV7("div", {
    className: "flex items-center gap-2 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800",
    children: [
      /* @__PURE__ */ jsxDEV7(MaterialIcon, {
        name: icon,
        className: "text-primary"
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV7("h2", {
        className: "text-2xl font-bold uppercase tracking-wide",
        children: title
      }, undefined, false, undefined, this),
      trailing ? /* @__PURE__ */ jsxDEV7("div", {
        className: "ml-auto",
        children: trailing
      }, undefined, false, undefined, this) : null
    ]
  }, undefined, true, undefined, this);
}
// src/components/ui-typography/ui-typography.tsx
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var TYPOGRAPHY_CONFIG = {
  h1: {
    element: "h1",
    className: "text-4xl md:text-5xl font-black tracking-tight uppercase font-display"
  },
  h2: {
    element: "h2",
    className: "text-2xl font-bold uppercase tracking-wide font-display"
  },
  h3: {
    element: "h3",
    className: "text-xl font-bold font-display"
  },
  h4: {
    element: "h4",
    className: "font-bold uppercase tracking-wide text-sm font-display"
  },
  "body-large": {
    element: "p",
    className: "text-lg text-text-light dark:text-text-dark"
  },
  body: {
    element: "p",
    className: "text-base text-text-muted-light dark:text-text-muted-dark"
  },
  caption: {
    element: "p",
    className: "text-sm text-text-muted-light dark:text-text-muted-dark"
  },
  micro: {
    element: "p",
    className: "text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
  },
  label: {
    element: "p",
    className: "text-xs font-mono text-gray-400 dark:text-gray-500"
  }
};
function Typography({
  variant = "body",
  children,
  className,
  as
}) {
  const config = TYPOGRAPHY_CONFIG[variant];
  const Element = as || config.element;
  return /* @__PURE__ */ jsxDEV8(Element, {
    className: cx(config.className, className),
    children
  }, undefined, false, undefined, this);
}
// src/components/ui-combobox/ui-combobox.tsx
import { useState as useState3, useRef as useRef2, useMemo as useMemo2, memo } from "react";

// src/components/ui-dropdown/ui-dropdown.tsx
import { useEffect as useEffect2, useRef, useState as useState2 } from "react";
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
"use client";
function Dropdown({
  open,
  onClose,
  anchorRef,
  children,
  className,
  matchTriggerWidth = true
}) {
  const dialogRef = useRef(null);
  const [position, setPosition] = useState2(null);
  useEffect2(() => {
    if (!open || !anchorRef.current)
      return;
    const updatePosition = () => {
      if (!anchorRef.current)
        return;
      const rect = anchorRef.current.getBoundingClientRect();
      const dialog = dialogRef.current;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let newTop = rect.bottom + 4;
      let newLeft = rect.left;
      const newWidth = rect.width;
      if (dialog) {
        const dialogRect = dialog.getBoundingClientRect();
        if (dialogRect.height > 0 && dialogRect.width > 0) {
          const dialogHeight = dialogRect.height;
          const dialogWidth = dialogRect.width;
          if (newTop + dialogHeight > vh) {
            const spaceAbove = rect.top - 4;
            const spaceBelow = vh - newTop;
            if (spaceAbove > spaceBelow) {
              newTop = rect.top - dialogHeight - 4;
              if (newTop < 4)
                newTop = 4;
            }
          }
          if (newLeft + dialogWidth > vw) {
            newLeft = vw - dialogWidth - 8;
            if (newLeft < 4)
              newLeft = 4;
          }
        }
      }
      setPosition((prev) => {
        if (prev && Math.abs(prev.top - newTop) < 1 && Math.abs(prev.left - newLeft) < 1 && Math.abs(prev.width - newWidth) < 1) {
          return prev;
        }
        return {
          top: newTop,
          left: newLeft,
          width: newWidth
        };
      });
    };
    updatePosition();
    let animationFrameId;
    const loop = () => {
      updatePosition();
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", updatePosition);
      window.visualViewport.addEventListener("scroll", updatePosition);
    }
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", updatePosition);
        window.visualViewport.removeEventListener("scroll", updatePosition);
      }
    };
  }, [open, anchorRef]);
  useEffect2(() => {
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open, position]);
  const handleDialogClick = (e) => {
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const rect = dialog.getBoundingClientRect();
    const isInDialog = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!isInDialog) {
      e.stopPropagation();
      onClose();
    }
  };
  if (!position)
    return null;
  return /* @__PURE__ */ jsxDEV9("dialog", {
    ref: dialogRef,
    className: cx("dropdown-dialog", className),
    onClick: handleDialogClick,
    onClose,
    style: {
      top: `${position.top}px`,
      left: `${position.left}px`,
      width: matchTriggerWidth ? `${position.width}px` : "auto",
      minWidth: matchTriggerWidth ? undefined : `${position.width}px`,
      maxWidth: matchTriggerWidth ? undefined : "300px",
      margin: 0
    },
    children: /* @__PURE__ */ jsxDEV9("div", {
      className: "dropdown-content",
      children
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}

// src/components/ui-combobox/ui-combobox.tsx
import { jsxDEV as jsxDEV10, Fragment } from "react/jsx-dev-runtime";
"use client";
function Combobox(props) {
  const {
    options,
    label,
    placeholder = "Select option...",
    className,
    searchPlaceholder = "Search...",
    renderOption,
    matchTriggerWidth = true,
    formik,
    name
  } = props;
  const [open, setOpen] = useState3(false);
  const [search, setSearch] = useState3("");
  const triggerRef = useRef2(null);
  const searchInputRef = useRef2(null);
  const currentValue = formik && name ? formik.values?.[name] : props.value;
  const selectedOption = options.find((opt) => opt.value === currentValue);
  const filteredOptions = useMemo2(() => {
    if (!search)
      return options;
    const lowerSearch = search.toLowerCase();
    const filtered = options.filter((opt) => opt.label.toLowerCase().includes(lowerSearch) || opt.value && opt.value.toLowerCase().includes(lowerSearch) || opt.searchLabel && typeof opt.searchLabel === "string" && opt.searchLabel.toLowerCase().includes(lowerSearch));
    return filtered.sort((a, b) => {
      const aLabel = (a.searchLabel || a.label).toLowerCase();
      const bLabel = (b.searchLabel || b.label).toLowerCase();
      const aValue = (a.value || "").toLowerCase();
      const bValue = (b.value || "").toLowerCase();
      const aExactValue = aValue === lowerSearch;
      const bExactValue = bValue === lowerSearch;
      if (aExactValue && !bExactValue)
        return -1;
      if (!aExactValue && bExactValue)
        return 1;
      const aExactLabel = aLabel === lowerSearch;
      const bExactLabel = bLabel === lowerSearch;
      if (aExactLabel && !bExactLabel)
        return -1;
      if (!aExactLabel && bExactLabel)
        return 1;
      const aStartsLabel = aLabel.startsWith(lowerSearch);
      const bStartsLabel = bLabel.startsWith(lowerSearch);
      if (aStartsLabel && !bStartsLabel)
        return -1;
      if (!aStartsLabel && bStartsLabel)
        return 1;
      const aStartsValue = aValue.startsWith(lowerSearch);
      const bStartsValue = bValue.startsWith(lowerSearch);
      if (aStartsValue && !bStartsValue)
        return -1;
      if (!aStartsValue && bStartsValue)
        return 1;
      return 0;
    });
  }, [options, search]);
  const handleSelect = (optionValue) => {
    if (formik && name) {
      formik.setFieldValue(name, optionValue);
      formik.setFieldTouched(name, true);
    } else {
      const onChange = props.onChange;
      onChange(optionValue);
    }
    setOpen(false);
    setSearch("");
  };
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
  };
  const handleTriggerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (open) {
      setOpen(false);
    } else {
      handleOpen(e);
    }
  };
  return /* @__PURE__ */ jsxDEV10("div", {
    className: cx("form-group", className),
    children: [
      label && /* @__PURE__ */ jsxDEV10("label", {
        children: label
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV10("button", {
        ref: triggerRef,
        type: "button",
        className: "input combobox-trigger",
        onClick: handleTriggerClick,
        "aria-expanded": open,
        "aria-haspopup": "dialog",
        children: [
          /* @__PURE__ */ jsxDEV10("span", {
            className: cx(!selectedOption && "text-gray-500"),
            children: selectedOption ? /* @__PURE__ */ jsxDEV10("span", {
              className: "flex items-center gap-2",
              children: [
                selectedOption.icon && /* @__PURE__ */ jsxDEV10("span", {
                  children: selectedOption.icon
                }, undefined, false, undefined, this),
                selectedOption.label
              ]
            }, undefined, true, undefined, this) : placeholder
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV10(MaterialIcon, {
            name: "expand_more",
            className: cx("combobox-chevron", open && "open")
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsxDEV10(Dropdown, {
        open,
        onClose: () => setOpen(false),
        anchorRef: triggerRef,
        matchTriggerWidth,
        children: [
          /* @__PURE__ */ jsxDEV10("div", {
            className: "dropdown-header",
            children: /* @__PURE__ */ jsxDEV10("input", {
              ref: searchInputRef,
              type: "text",
              className: "dropdown-search-input",
              placeholder: searchPlaceholder,
              value: search,
              onChange: (e) => setSearch(e.target.value),
              onClick: (e) => e.stopPropagation()
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this),
          open && /* @__PURE__ */ jsxDEV10("ul", {
            className: "dropdown-list",
            children: filteredOptions.length > 0 ? filteredOptions.map((option) => /* @__PURE__ */ jsxDEV10("li", {
              className: cx("dropdown-item", option.value === currentValue && "selected"),
              onClick: () => handleSelect(option.value),
              children: renderOption ? renderOption(option) : /* @__PURE__ */ jsxDEV10(Fragment, {
                children: [
                  option.icon && /* @__PURE__ */ jsxDEV10("span", {
                    children: option.icon
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsxDEV10("span", {
                    children: option.label
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this)
            }, `${option.value}-${option.label}`, false, undefined, this)) : /* @__PURE__ */ jsxDEV10("li", {
              className: "dropdown-item text-gray-400 cursor-default",
              children: "No results found"
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      formik && name && formik.touched?.[name] && formik.errors?.[name] && /* @__PURE__ */ jsxDEV10("span", {
        className: "error-message",
        children: typeof formik.errors[name] === "string" ? formik.errors[name] : "Invalid field"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
var ui_combobox_default = memo(Combobox);
// src/components/ui-date-picker/ui-date-picker.tsx
import { useState as useState4, useRef as useRef3, useEffect as useEffect3 } from "react";
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
"use client";
function DatePicker(props) {
  const {
    minDate,
    placeholder = "Select date",
    className,
    label,
    formik,
    name
  } = props;
  const [isOpen, setIsOpen] = useState4(false);
  const triggerRef = useRef3(null);
  const currentValue = formik && name ? formik.values?.[name] : props.value;
  const dateValue = currentValue ? new Date(currentValue) : null;
  const [viewDate, setViewDate] = useState4(dateValue || new Date);
  useEffect3(() => {
    if (isOpen && dateValue) {
      setViewDate(dateValue);
    } else if (isOpen && !dateValue) {
      setViewDate(new Date);
    }
  }, [isOpen, currentValue]);
  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  const firstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };
  const handleNextMonth = (e) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };
  const handleDateClick = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    newDate.setHours(0, 0, 0, 0);
    if (isDateDisabled(newDate))
      return;
    if (formik && name) {
      formik.setFieldValue(name, newDate);
      formik.setFieldTouched(name, true);
    } else {
      const onChange = props.onChange;
      onChange(newDate);
    }
    setIsOpen(false);
  };
  const isDateDisabled = (date) => {
    if (!minDate)
      return false;
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const compareMin = new Date(minDate);
    compareMin.setHours(0, 0, 0, 0);
    return compareDate < compareMin;
  };
  const isSameDate = (d1, d2) => {
    if (!d1)
      return false;
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };
  const isToday = (date) => {
    const today = new Date;
    return isSameDate(today, date);
  };
  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth(viewDate);
    const startDay = firstDayOfMonth(viewDate);
    for (let i = 0;i < startDay; i++) {
      days.push(/* @__PURE__ */ jsxDEV11("div", {
        className: "calendar-day empty"
      }, `empty-${i}`, false, undefined, this));
    }
    for (let i = 1;i <= totalDays; i++) {
      const currentDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), i);
      const disabled = isDateDisabled(currentDate);
      const selected = isSameDate(dateValue, currentDate);
      const today = isToday(currentDate);
      days.push(/* @__PURE__ */ jsxDEV11("div", {
        className: cx("calendar-day", disabled && "disabled", selected && "selected", today && "today"),
        onClick: (e) => {
          e.stopPropagation();
          if (!disabled)
            handleDateClick(i);
        },
        children: i
      }, `day-${i}`, false, undefined, this));
    }
    return days;
  };
  const formatDateDisplay = (date) => {
    if (!date)
      return placeholder;
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  return /* @__PURE__ */ jsxDEV11("div", {
    className: cx("form-group", className),
    children: [
      label && /* @__PURE__ */ jsxDEV11("label", {
        children: label
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV11("div", {
        ref: triggerRef,
        className: cx("date-picker-trigger", isOpen && "open"),
        onClick: () => setIsOpen(!isOpen),
        children: [
          /* @__PURE__ */ jsxDEV11("div", {
            className: "date-picker-value",
            children: [
              /* @__PURE__ */ jsxDEV11(MaterialIcon, {
                name: "calendar_month",
                className: "date-picker-icon"
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV11("span", {
                children: formatDateDisplay(dateValue)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsxDEV11(MaterialIcon, {
            name: "expand_more",
            className: cx("combobox-chevron", isOpen && "open")
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsxDEV11(Dropdown, {
        open: isOpen,
        onClose: () => setIsOpen(false),
        anchorRef: triggerRef,
        className: "date-picker-dropdown",
        matchTriggerWidth: false,
        children: [
          /* @__PURE__ */ jsxDEV11("div", {
            className: "calendar-header",
            children: [
              /* @__PURE__ */ jsxDEV11("button", {
                type: "button",
                className: "calendar-nav-btn",
                onClick: handlePrevMonth,
                children: /* @__PURE__ */ jsxDEV11(MaterialIcon, {
                  name: "chevron_left"
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV11("span", {
                className: "current-month",
                children: viewDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric"
                })
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV11("button", {
                type: "button",
                className: "calendar-nav-btn",
                onClick: handleNextMonth,
                children: /* @__PURE__ */ jsxDEV11(MaterialIcon, {
                  name: "chevron_right"
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsxDEV11("div", {
            className: "calendar-grid",
            children: [
              ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => /* @__PURE__ */ jsxDEV11("div", {
                className: "calendar-weekday",
                children: day
              }, day, false, undefined, this)),
              renderCalendarDays()
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      formik && name && formik.touched?.[name] && formik.errors?.[name] && /* @__PURE__ */ jsxDEV11("span", {
        className: "error-message",
        children: typeof formik.errors[name] === "string" ? formik.errors[name] : "Invalid field"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
// src/components/ui-dialog/ui-dialog.tsx
import { useEffect as useEffect4, useRef as useRef4 } from "react";
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
"use client";
function Dialog({
  title,
  subtitle,
  className,
  description,
  open,
  onClose,
  closedBy,
  children,
  footer,
  showCloseButton = true
}) {
  const dialogRef = useRef4(null);
  useEffect4(() => {
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [open]);
  const backdropClickRef = useRef4(false);
  const handledByCancelRef = useRef4(false);
  const isClosingRef = useRef4(false);
  useEffect4(() => {
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const handleClick = (event) => {
      if (event.target === dialog) {
        backdropClickRef.current = true;
      }
    };
    dialog.addEventListener("click", handleClick);
    return () => {
      dialog.removeEventListener("click", handleClick);
    };
  }, []);
  useEffect4(() => {
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const handleCancel = (event) => {
      if (closedBy === "none") {
        event.preventDefault();
        handledByCancelRef.current = false;
      } else {
        handledByCancelRef.current = true;
      }
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [closedBy]);
  useEffect4(() => {
    const dialog = dialogRef.current;
    if (!dialog)
      return;
    const handleClose = () => {
      if (isClosingRef.current) {
        return;
      }
      if (closedBy === "none") {
        if (open) {
          dialog.showModal();
        }
        backdropClickRef.current = false;
        handledByCancelRef.current = false;
        return;
      }
      if (closedBy === "closerequest" && backdropClickRef.current && !handledByCancelRef.current) {
        if (open) {
          dialog.showModal();
        }
        backdropClickRef.current = false;
        handledByCancelRef.current = false;
        return;
      }
      backdropClickRef.current = false;
      handledByCancelRef.current = false;
      if (open) {
        isClosingRef.current = true;
        onClose();
        setTimeout(() => {
          isClosingRef.current = false;
        }, 0);
      }
    };
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [onClose, closedBy, open]);
  return /* @__PURE__ */ jsxDEV12("dialog", {
    ref: dialogRef,
    className: cx("dialog", className),
    children: /* @__PURE__ */ jsxDEV12("div", {
      className: "dialog-wrapper",
      children: [
        (title || subtitle || showCloseButton) && /* @__PURE__ */ jsxDEV12("div", {
          className: "dialog-header",
          children: [
            /* @__PURE__ */ jsxDEV12("div", {
              className: "dialog-header-content",
              children: [
                title && /* @__PURE__ */ jsxDEV12("h2", {
                  className: "dialog-title",
                  children: title
                }, undefined, false, undefined, this),
                subtitle && /* @__PURE__ */ jsxDEV12("p", {
                  className: "dialog-subtitle",
                  children: subtitle
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this),
            showCloseButton && /* @__PURE__ */ jsxDEV12("button", {
              type: "button",
              onClick: onClose,
              className: "dialog-close-button",
              "aria-label": "Close dialog",
              children: /* @__PURE__ */ jsxDEV12(MaterialIcon, {
                name: "close"
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        /* @__PURE__ */ jsxDEV12("div", {
          className: "dialog-body",
          children: [
            description && /* @__PURE__ */ jsxDEV12("p", {
              className: "dialog-description",
              children: description
            }, undefined, false, undefined, this),
            children
          ]
        }, undefined, true, undefined, this),
        footer && /* @__PURE__ */ jsxDEV12("div", {
          className: "dialog-footer",
          children: footer
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}
// src/components/ui-phone-input/ui-phone-input.tsx
import { useMemo as useMemo3, useState as useState5, useEffect as useEffect5, memo as memo2, useCallback } from "react";

// src/assets/countries.json
var countries_default = [
  {
    name: "Afghanistan",
    flag: "🇦🇫",
    code: "AF",
    dial_code: "+93"
  },
  {
    name: "Åland Islands",
    flag: "🇦🇽",
    code: "AX",
    dial_code: "+358"
  },
  {
    name: "Albania",
    flag: "🇦🇱",
    code: "AL",
    dial_code: "+355"
  },
  {
    name: "Algeria",
    flag: "🇩🇿",
    code: "DZ",
    dial_code: "+213"
  },
  {
    name: "American Samoa",
    flag: "🇦🇸",
    code: "AS",
    dial_code: "+1684"
  },
  {
    name: "Andorra",
    flag: "🇦🇩",
    code: "AD",
    dial_code: "+376"
  },
  {
    name: "Angola",
    flag: "🇦🇴",
    code: "AO",
    dial_code: "+244"
  },
  {
    name: "Anguilla",
    flag: "🇦🇮",
    code: "AI",
    dial_code: "+1264"
  },
  {
    name: "Antarctica",
    flag: "🇦🇶",
    code: "AQ",
    dial_code: "+672"
  },
  {
    name: "Antigua and Barbuda",
    flag: "🇦🇬",
    code: "AG",
    dial_code: "+1268"
  },
  {
    name: "Argentina",
    flag: "🇦🇷",
    code: "AR",
    dial_code: "+54"
  },
  {
    name: "Armenia",
    flag: "🇦🇲",
    code: "AM",
    dial_code: "+374"
  },
  {
    name: "Aruba",
    flag: "🇦🇼",
    code: "AW",
    dial_code: "+297"
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    code: "AU",
    dial_code: "+61"
  },
  {
    name: "Austria",
    flag: "🇦🇹",
    code: "AT",
    dial_code: "+43"
  },
  {
    name: "Azerbaijan",
    flag: "🇦🇿",
    code: "AZ",
    dial_code: "+994"
  },
  {
    name: "Bahamas",
    flag: "🇧🇸",
    code: "BS",
    dial_code: "+1242"
  },
  {
    name: "Bahrain",
    flag: "🇧🇭",
    code: "BH",
    dial_code: "+973"
  },
  {
    name: "Bangladesh",
    flag: "🇧🇩",
    code: "BD",
    dial_code: "+880"
  },
  {
    name: "Barbados",
    flag: "🇧🇧",
    code: "BB",
    dial_code: "+1246"
  },
  {
    name: "Belarus",
    flag: "🇧🇾",
    code: "BY",
    dial_code: "+375"
  },
  {
    name: "Belgium",
    flag: "🇧🇪",
    code: "BE",
    dial_code: "+32"
  },
  {
    name: "Belize",
    flag: "🇧🇿",
    code: "BZ",
    dial_code: "+501"
  },
  {
    name: "Benin",
    flag: "🇧🇯",
    code: "BJ",
    dial_code: "+229"
  },
  {
    name: "Bermuda",
    flag: "🇧🇲",
    code: "BM",
    dial_code: "+1441"
  },
  {
    name: "Bhutan",
    flag: "🇧🇹",
    code: "BT",
    dial_code: "+975"
  },
  {
    name: "Bolivia",
    flag: "🇧🇴",
    code: "BO",
    dial_code: "+591"
  },
  {
    name: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    code: "BA",
    dial_code: "+387"
  },
  {
    name: "Botswana",
    flag: "🇧🇼",
    code: "BW",
    dial_code: "+267"
  },
  {
    name: "Bouvet Island",
    flag: "🇧🇻",
    code: "BV",
    dial_code: "+47"
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    code: "BR",
    dial_code: "+55"
  },
  {
    name: "British Indian Ocean Territory",
    flag: "🇮🇴",
    code: "IO",
    dial_code: "+246"
  },
  {
    name: "Brunei Darussalam",
    flag: "🇧🇳",
    code: "BN",
    dial_code: "+673"
  },
  {
    name: "Bulgaria",
    flag: "🇧🇬",
    code: "BG",
    dial_code: "+359"
  },
  {
    name: "Burkina Faso",
    flag: "🇧🇫",
    code: "BF",
    dial_code: "+226"
  },
  {
    name: "Burundi",
    flag: "🇧🇮",
    code: "BI",
    dial_code: "+257"
  },
  {
    name: "Cambodia",
    flag: "🇰🇭",
    code: "KH",
    dial_code: "+855"
  },
  {
    name: "Cameroon",
    flag: "🇨🇲",
    code: "CM",
    dial_code: "+237"
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    code: "CA",
    dial_code: "+1"
  },
  {
    name: "Cape Verde",
    flag: "🇨🇻",
    code: "CV",
    dial_code: "+238"
  },
  {
    name: "Cayman Islands",
    flag: "🇰🇾",
    code: "KY",
    dial_code: "+1345"
  },
  {
    name: "Central African Republic",
    flag: "🇨🇫",
    code: "CF",
    dial_code: "+236"
  },
  {
    name: "Chad",
    flag: "🇹🇩",
    code: "TD",
    dial_code: "+235"
  },
  {
    name: "Chile",
    flag: "🇨🇱",
    code: "CL",
    dial_code: "+56"
  },
  {
    name: "China",
    flag: "🇨🇳",
    code: "CN",
    dial_code: "+86"
  },
  {
    name: "Christmas Island",
    flag: "🇨🇽",
    code: "CX",
    dial_code: "+61"
  },
  {
    name: "Cocos (Keeling) Islands",
    flag: "🇨🇨",
    code: "CC",
    dial_code: "+61"
  },
  {
    name: "Colombia",
    flag: "🇨🇴",
    code: "CO",
    dial_code: "+57"
  },
  {
    name: "Comoros",
    flag: "🇰🇲",
    code: "KM",
    dial_code: "+269"
  },
  {
    name: "Congo",
    flag: "🇨🇬",
    code: "CG",
    dial_code: "+242"
  },
  {
    name: "Congo, The Democratic Republic of the Congo",
    flag: "🇨🇩",
    code: "CD",
    dial_code: "+243"
  },
  {
    name: "Cook Islands",
    flag: "🇨🇰",
    code: "CK",
    dial_code: "+682"
  },
  {
    name: "Costa Rica",
    flag: "🇨🇷",
    code: "CR",
    dial_code: "+506"
  },
  {
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
    code: "CI",
    dial_code: "+225"
  },
  {
    name: "Croatia",
    flag: "🇭🇷",
    code: "HR",
    dial_code: "+385"
  },
  {
    name: "Cuba",
    flag: "🇨🇺",
    code: "CU",
    dial_code: "+53"
  },
  {
    name: "Cyprus",
    flag: "🇨🇾",
    code: "CY",
    dial_code: "+357"
  },
  {
    name: "Czech Republic",
    flag: "🇨🇿",
    code: "CZ",
    dial_code: "+420"
  },
  {
    name: "Denmark",
    flag: "🇩🇰",
    code: "DK",
    dial_code: "+45"
  },
  {
    name: "Djibouti",
    flag: "🇩🇯",
    code: "DJ",
    dial_code: "+253"
  },
  {
    name: "Dominica",
    flag: "🇩🇲",
    code: "DM",
    dial_code: "+1767"
  },
  {
    name: "Dominican Republic",
    flag: "🇩🇴",
    code: "DO",
    dial_code: "+1849"
  },
  {
    name: "Ecuador",
    flag: "🇪🇨",
    code: "EC",
    dial_code: "+593"
  },
  {
    name: "Egypt",
    flag: "🇪🇬",
    code: "EG",
    dial_code: "+20"
  },
  {
    name: "El Salvador",
    flag: "🇸🇻",
    code: "SV",
    dial_code: "+503"
  },
  {
    name: "Equatorial Guinea",
    flag: "🇬🇶",
    code: "GQ",
    dial_code: "+240"
  },
  {
    name: "Eritrea",
    flag: "🇪🇷",
    code: "ER",
    dial_code: "+291"
  },
  {
    name: "Estonia",
    flag: "🇪🇪",
    code: "EE",
    dial_code: "+372"
  },
  {
    name: "Ethiopia",
    flag: "🇪🇹",
    code: "ET",
    dial_code: "+251"
  },
  {
    name: "Falkland Islands (Malvinas)",
    flag: "🇫🇰",
    code: "FK",
    dial_code: "+500"
  },
  {
    name: "Faroe Islands",
    flag: "🇫🇴",
    code: "FO",
    dial_code: "+298"
  },
  {
    name: "Fiji",
    flag: "🇫🇯",
    code: "FJ",
    dial_code: "+679"
  },
  {
    name: "Finland",
    flag: "🇫🇮",
    code: "FI",
    dial_code: "+358"
  },
  {
    name: "France",
    flag: "🇫🇷",
    code: "FR",
    dial_code: "+33"
  },
  {
    name: "French Guiana",
    flag: "🇬🇫",
    code: "GF",
    dial_code: "+594"
  },
  {
    name: "French Polynesia",
    flag: "🇵🇫",
    code: "PF",
    dial_code: "+689"
  },
  {
    name: "French Southern Territories",
    flag: "🇹🇫",
    code: "TF",
    dial_code: "+262"
  },
  {
    name: "Gabon",
    flag: "🇬🇦",
    code: "GA",
    dial_code: "+241"
  },
  {
    name: "Gambia",
    flag: "🇬🇲",
    code: "GM",
    dial_code: "+220"
  },
  {
    name: "Georgia",
    flag: "🇬🇪",
    code: "GE",
    dial_code: "+995"
  },
  {
    name: "Germany",
    flag: "🇩🇪",
    code: "DE",
    dial_code: "+49"
  },
  {
    name: "Ghana",
    flag: "🇬🇭",
    code: "GH",
    dial_code: "+233"
  },
  {
    name: "Gibraltar",
    flag: "🇬🇮",
    code: "GI",
    dial_code: "+350"
  },
  {
    name: "Greece",
    flag: "🇬🇷",
    code: "GR",
    dial_code: "+30"
  },
  {
    name: "Greenland",
    flag: "🇬🇱",
    code: "GL",
    dial_code: "+299"
  },
  {
    name: "Grenada",
    flag: "🇬🇩",
    code: "GD",
    dial_code: "+1473"
  },
  {
    name: "Guadeloupe",
    flag: "🇬🇵",
    code: "GP",
    dial_code: "+590"
  },
  {
    name: "Guam",
    flag: "🇬🇺",
    code: "GU",
    dial_code: "+1671"
  },
  {
    name: "Guatemala",
    flag: "🇬🇹",
    code: "GT",
    dial_code: "+502"
  },
  {
    name: "Guernsey",
    flag: "🇬🇬",
    code: "GG",
    dial_code: "+44"
  },
  {
    name: "Guinea",
    flag: "🇬🇳",
    code: "GN",
    dial_code: "+224"
  },
  {
    name: "Guinea-Bissau",
    flag: "🇬🇼",
    code: "GW",
    dial_code: "+245"
  },
  {
    name: "Guyana",
    flag: "🇬🇾",
    code: "GY",
    dial_code: "+592"
  },
  {
    name: "Haiti",
    flag: "🇭🇹",
    code: "HT",
    dial_code: "+509"
  },
  {
    name: "Heard Island and Mcdonald Islands",
    flag: "🇭🇲",
    code: "HM",
    dial_code: "+672"
  },
  {
    name: "Holy See (Vatican City State)",
    flag: "🇻🇦",
    code: "VA",
    dial_code: "+379"
  },
  {
    name: "Honduras",
    flag: "🇭🇳",
    code: "HN",
    dial_code: "+504"
  },
  {
    name: "Hong Kong",
    flag: "🇭🇰",
    code: "HK",
    dial_code: "+852"
  },
  {
    name: "Hungary",
    flag: "🇭🇺",
    code: "HU",
    dial_code: "+36"
  },
  {
    name: "Iceland",
    flag: "🇮🇸",
    code: "IS",
    dial_code: "+354"
  },
  {
    name: "India",
    flag: "🇮🇳",
    code: "IN",
    dial_code: "+91"
  },
  {
    name: "Indonesia",
    flag: "🇮🇩",
    code: "ID",
    dial_code: "+62"
  },
  {
    name: "Iran",
    flag: "🇮🇷",
    code: "IR",
    dial_code: "+98"
  },
  {
    name: "Iraq",
    flag: "🇮🇶",
    code: "IQ",
    dial_code: "+964"
  },
  {
    name: "Ireland",
    flag: "🇮🇪",
    code: "IE",
    dial_code: "+353"
  },
  {
    name: "Isle of Man",
    flag: "🇮🇲",
    code: "IM",
    dial_code: "+44"
  },
  {
    name: "Israel",
    flag: "🇮🇱",
    code: "IL",
    dial_code: "+972"
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    code: "IT",
    dial_code: "+39"
  },
  {
    name: "Jamaica",
    flag: "🇯🇲",
    code: "JM",
    dial_code: "+1876"
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    code: "JP",
    dial_code: "+81"
  },
  {
    name: "Jersey",
    flag: "🇯🇪",
    code: "JE",
    dial_code: "+44"
  },
  {
    name: "Jordan",
    flag: "🇯🇴",
    code: "JO",
    dial_code: "+962"
  },
  {
    name: "Kazakhstan",
    flag: "🇰🇿",
    code: "KZ",
    dial_code: "+7"
  },
  {
    name: "Kenya",
    flag: "🇰🇪",
    code: "KE",
    dial_code: "+254"
  },
  {
    name: "Kiribati",
    flag: "🇰🇮",
    code: "KI",
    dial_code: "+686"
  },
  {
    name: "Korea, Democratic People's Republic of Korea",
    flag: "🇰🇵",
    code: "KP",
    dial_code: "+850"
  },
  {
    name: "Korea, Republic of South Korea",
    flag: "🇰🇷",
    code: "KR",
    dial_code: "+82"
  },
  {
    name: "Kosovo",
    flag: "🇽🇰",
    code: "XK",
    dial_code: "+383"
  },
  {
    name: "Kuwait",
    flag: "🇰🇼",
    code: "KW",
    dial_code: "+965"
  },
  {
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    code: "KG",
    dial_code: "+996"
  },
  {
    name: "Laos",
    flag: "🇱🇦",
    code: "LA",
    dial_code: "+856"
  },
  {
    name: "Latvia",
    flag: "🇱🇻",
    code: "LV",
    dial_code: "+371"
  },
  {
    name: "Lebanon",
    flag: "🇱🇧",
    code: "LB",
    dial_code: "+961"
  },
  {
    name: "Lesotho",
    flag: "🇱🇸",
    code: "LS",
    dial_code: "+266"
  },
  {
    name: "Liberia",
    flag: "🇱🇷",
    code: "LR",
    dial_code: "+231"
  },
  {
    name: "Libyan Arab Jamahiriya",
    flag: "🇱🇾",
    code: "LY",
    dial_code: "+218"
  },
  {
    name: "Liechtenstein",
    flag: "🇱🇮",
    code: "LI",
    dial_code: "+423"
  },
  {
    name: "Lithuania",
    flag: "🇱🇹",
    code: "LT",
    dial_code: "+370"
  },
  {
    name: "Luxembourg",
    flag: "🇱🇺",
    code: "LU",
    dial_code: "+352"
  },
  {
    name: "Macao",
    flag: "🇲🇴",
    code: "MO",
    dial_code: "+853"
  },
  {
    name: "Macedonia",
    flag: "🇲🇰",
    code: "MK",
    dial_code: "+389"
  },
  {
    name: "Madagascar",
    flag: "🇲🇬",
    code: "MG",
    dial_code: "+261"
  },
  {
    name: "Malawi",
    flag: "🇲🇼",
    code: "MW",
    dial_code: "+265"
  },
  {
    name: "Malaysia",
    flag: "🇲🇾",
    code: "MY",
    dial_code: "+60"
  },
  {
    name: "Maldives",
    flag: "🇲🇻",
    code: "MV",
    dial_code: "+960"
  },
  {
    name: "Mali",
    flag: "🇲🇱",
    code: "ML",
    dial_code: "+223"
  },
  {
    name: "Malta",
    flag: "🇲🇹",
    code: "MT",
    dial_code: "+356"
  },
  {
    name: "Marshall Islands",
    flag: "🇲🇭",
    code: "MH",
    dial_code: "+692"
  },
  {
    name: "Martinique",
    flag: "🇲🇶",
    code: "MQ",
    dial_code: "+596"
  },
  {
    name: "Mauritania",
    flag: "🇲🇷",
    code: "MR",
    dial_code: "+222"
  },
  {
    name: "Mauritius",
    flag: "🇲🇺",
    code: "MU",
    dial_code: "+230"
  },
  {
    name: "Mayotte",
    flag: "🇾🇹",
    code: "YT",
    dial_code: "+262"
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    code: "MX",
    dial_code: "+52"
  },
  {
    name: "Micronesia, Federated States of Micronesia",
    flag: "🇫🇲",
    code: "FM",
    dial_code: "+691"
  },
  {
    name: "Moldova",
    flag: "🇲🇩",
    code: "MD",
    dial_code: "+373"
  },
  {
    name: "Monaco",
    flag: "🇲🇨",
    code: "MC",
    dial_code: "+377"
  },
  {
    name: "Mongolia",
    flag: "🇲🇳",
    code: "MN",
    dial_code: "+976"
  },
  {
    name: "Montenegro",
    flag: "🇲🇪",
    code: "ME",
    dial_code: "+382"
  },
  {
    name: "Montserrat",
    flag: "🇲🇸",
    code: "MS",
    dial_code: "+1664"
  },
  {
    name: "Morocco",
    flag: "🇲🇦",
    code: "MA",
    dial_code: "+212"
  },
  {
    name: "Mozambique",
    flag: "🇲🇿",
    code: "MZ",
    dial_code: "+258"
  },
  {
    name: "Myanmar",
    flag: "🇲🇲",
    code: "MM",
    dial_code: "+95"
  },
  {
    name: "Namibia",
    flag: "🇳🇦",
    code: "NA",
    dial_code: "+264"
  },
  {
    name: "Nauru",
    flag: "🇳🇷",
    code: "NR",
    dial_code: "+674"
  },
  {
    name: "Nepal",
    flag: "🇳🇵",
    code: "NP",
    dial_code: "+977"
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    code: "NL",
    dial_code: "+31"
  },
  {
    name: "Netherlands Antilles",
    flag: "",
    code: "AN",
    dial_code: "+599"
  },
  {
    name: "New Caledonia",
    flag: "🇳🇨",
    code: "NC",
    dial_code: "+687"
  },
  {
    name: "New Zealand",
    flag: "🇳🇿",
    code: "NZ",
    dial_code: "+64"
  },
  {
    name: "Nicaragua",
    flag: "🇳🇮",
    code: "NI",
    dial_code: "+505"
  },
  {
    name: "Niger",
    flag: "🇳🇪",
    code: "NE",
    dial_code: "+227"
  },
  {
    name: "Nigeria",
    flag: "🇳🇬",
    code: "NG",
    dial_code: "+234"
  },
  {
    name: "Niue",
    flag: "🇳🇺",
    code: "NU",
    dial_code: "+683"
  },
  {
    name: "Norfolk Island",
    flag: "🇳🇫",
    code: "NF",
    dial_code: "+672"
  },
  {
    name: "Northern Mariana Islands",
    flag: "🇲🇵",
    code: "MP",
    dial_code: "+1670"
  },
  {
    name: "Norway",
    flag: "🇳🇴",
    code: "NO",
    dial_code: "+47"
  },
  {
    name: "Oman",
    flag: "🇴🇲",
    code: "OM",
    dial_code: "+968"
  },
  {
    name: "Pakistan",
    flag: "🇵🇰",
    code: "PK",
    dial_code: "+92"
  },
  {
    name: "Palau",
    flag: "🇵🇼",
    code: "PW",
    dial_code: "+680"
  },
  {
    name: "Palestinian Territory, Occupied",
    flag: "🇵🇸",
    code: "PS",
    dial_code: "+970"
  },
  {
    name: "Panama",
    flag: "🇵🇦",
    code: "PA",
    dial_code: "+507"
  },
  {
    name: "Papua New Guinea",
    flag: "🇵🇬",
    code: "PG",
    dial_code: "+675"
  },
  {
    name: "Paraguay",
    flag: "🇵🇾",
    code: "PY",
    dial_code: "+595"
  },
  {
    name: "Peru",
    flag: "🇵🇪",
    code: "PE",
    dial_code: "+51"
  },
  {
    name: "Philippines",
    flag: "🇵🇭",
    code: "PH",
    dial_code: "+63"
  },
  {
    name: "Pitcairn",
    flag: "🇵🇳",
    code: "PN",
    dial_code: "+64"
  },
  {
    name: "Poland",
    flag: "🇵🇱",
    code: "PL",
    dial_code: "+48"
  },
  {
    name: "Portugal",
    flag: "🇵🇹",
    code: "PT",
    dial_code: "+351"
  },
  {
    name: "Puerto Rico",
    flag: "🇵🇷",
    code: "PR",
    dial_code: "+1939"
  },
  {
    name: "Qatar",
    flag: "🇶🇦",
    code: "QA",
    dial_code: "+974"
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    code: "RO",
    dial_code: "+40"
  },
  {
    name: "Russia",
    flag: "🇷🇺",
    code: "RU",
    dial_code: "+7"
  },
  {
    name: "Rwanda",
    flag: "🇷🇼",
    code: "RW",
    dial_code: "+250"
  },
  {
    name: "Reunion",
    flag: "🇷🇪",
    code: "RE",
    dial_code: "+262"
  },
  {
    name: "Saint Barthelemy",
    flag: "🇧🇱",
    code: "BL",
    dial_code: "+590"
  },
  {
    name: "Saint Helena, Ascension and Tristan Da Cunha",
    flag: "🇸🇭",
    code: "SH",
    dial_code: "+290"
  },
  {
    name: "Saint Kitts and Nevis",
    flag: "🇰🇳",
    code: "KN",
    dial_code: "+1869"
  },
  {
    name: "Saint Lucia",
    flag: "🇱🇨",
    code: "LC",
    dial_code: "+1758"
  },
  {
    name: "Saint Martin",
    flag: "🇲🇫",
    code: "MF",
    dial_code: "+590"
  },
  {
    name: "Saint Pierre and Miquelon",
    flag: "🇵🇲",
    code: "PM",
    dial_code: "+508"
  },
  {
    name: "Saint Vincent and the Grenadines",
    flag: "🇻🇨",
    code: "VC",
    dial_code: "+1784"
  },
  {
    name: "Samoa",
    flag: "🇼🇸",
    code: "WS",
    dial_code: "+685"
  },
  {
    name: "San Marino",
    flag: "🇸🇲",
    code: "SM",
    dial_code: "+378"
  },
  {
    name: "Sao Tome and Principe",
    flag: "🇸🇹",
    code: "ST",
    dial_code: "+239"
  },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    code: "SA",
    dial_code: "+966"
  },
  {
    name: "Senegal",
    flag: "🇸🇳",
    code: "SN",
    dial_code: "+221"
  },
  {
    name: "Serbia",
    flag: "🇷🇸",
    code: "RS",
    dial_code: "+381"
  },
  {
    name: "Seychelles",
    flag: "🇸🇨",
    code: "SC",
    dial_code: "+248"
  },
  {
    name: "Sierra Leone",
    flag: "🇸🇱",
    code: "SL",
    dial_code: "+232"
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    code: "SG",
    dial_code: "+65"
  },
  {
    name: "Slovakia",
    flag: "🇸🇰",
    code: "SK",
    dial_code: "+421"
  },
  {
    name: "Slovenia",
    flag: "🇸🇮",
    code: "SI",
    dial_code: "+386"
  },
  {
    name: "Solomon Islands",
    flag: "🇸🇧",
    code: "SB",
    dial_code: "+677"
  },
  {
    name: "Somalia",
    flag: "🇸🇴",
    code: "SO",
    dial_code: "+252"
  },
  {
    name: "South Africa",
    flag: "🇿🇦",
    code: "ZA",
    dial_code: "+27"
  },
  {
    name: "South Sudan",
    flag: "🇸🇸",
    code: "SS",
    dial_code: "+211"
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    flag: "🇬🇸",
    code: "GS",
    dial_code: "+500"
  },
  {
    name: "Spain",
    flag: "🇪🇸",
    code: "ES",
    dial_code: "+34"
  },
  {
    name: "Sri Lanka",
    flag: "🇱🇰",
    code: "LK",
    dial_code: "+94"
  },
  {
    name: "Sudan",
    flag: "🇸🇩",
    code: "SD",
    dial_code: "+249"
  },
  {
    name: "Suriname",
    flag: "🇸🇷",
    code: "SR",
    dial_code: "+597"
  },
  {
    name: "Svalbard and Jan Mayen",
    flag: "🇸🇯",
    code: "SJ",
    dial_code: "+47"
  },
  {
    name: "Swaziland",
    flag: "🇸🇿",
    code: "SZ",
    dial_code: "+268"
  },
  {
    name: "Sweden",
    flag: "🇸🇪",
    code: "SE",
    dial_code: "+46"
  },
  {
    name: "Switzerland",
    flag: "🇨🇭",
    code: "CH",
    dial_code: "+41"
  },
  {
    name: "Syrian Arab Republic",
    flag: "🇸🇾",
    code: "SY",
    dial_code: "+963"
  },
  {
    name: "Taiwan",
    flag: "🇹🇼",
    code: "TW",
    dial_code: "+886"
  },
  {
    name: "Tajikistan",
    flag: "🇹🇯",
    code: "TJ",
    dial_code: "+992"
  },
  {
    name: "Tanzania, United Republic of Tanzania",
    flag: "🇹🇿",
    code: "TZ",
    dial_code: "+255"
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    code: "TH",
    dial_code: "+66"
  },
  {
    name: "Timor-Leste",
    flag: "🇹🇱",
    code: "TL",
    dial_code: "+670"
  },
  {
    name: "Togo",
    flag: "🇹🇬",
    code: "TG",
    dial_code: "+228"
  },
  {
    name: "Tokelau",
    flag: "🇹🇰",
    code: "TK",
    dial_code: "+690"
  },
  {
    name: "Tonga",
    flag: "🇹🇴",
    code: "TO",
    dial_code: "+676"
  },
  {
    name: "Trinidad and Tobago",
    flag: "🇹🇹",
    code: "TT",
    dial_code: "+1868"
  },
  {
    name: "Tunisia",
    flag: "🇹🇳",
    code: "TN",
    dial_code: "+216"
  },
  {
    name: "Turkey",
    flag: "🇹🇷",
    code: "TR",
    dial_code: "+90"
  },
  {
    name: "Turkmenistan",
    flag: "🇹🇲",
    code: "TM",
    dial_code: "+993"
  },
  {
    name: "Turks and Caicos Islands",
    flag: "🇹🇨",
    code: "TC",
    dial_code: "+1649"
  },
  {
    name: "Tuvalu",
    flag: "🇹🇻",
    code: "TV",
    dial_code: "+688"
  },
  {
    name: "Uganda",
    flag: "🇺🇬",
    code: "UG",
    dial_code: "+256"
  },
  {
    name: "Ukraine",
    flag: "🇺🇦",
    code: "UA",
    dial_code: "+380"
  },
  {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    code: "AE",
    dial_code: "+971"
  },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    code: "GB",
    dial_code: "+44"
  },
  {
    name: "United States",
    flag: "🇺🇸",
    code: "US",
    dial_code: "+1"
  },
  {
    name: "Uruguay",
    flag: "🇺🇾",
    code: "UY",
    dial_code: "+598"
  },
  {
    name: "Uzbekistan",
    flag: "🇺🇿",
    code: "UZ",
    dial_code: "+998"
  },
  {
    name: "Vanuatu",
    flag: "🇻🇺",
    code: "VU",
    dial_code: "+678"
  },
  {
    name: "Venezuela",
    flag: "🇻🇪",
    code: "VE",
    dial_code: "+58"
  },
  {
    name: "Vietnam",
    flag: "🇻🇳",
    code: "VN",
    dial_code: "+84"
  },
  {
    name: "Virgin Islands, British",
    flag: "🇻🇬",
    code: "VG",
    dial_code: "+1284"
  },
  {
    name: "Virgin Islands, U.S.",
    flag: "🇻🇮",
    code: "VI",
    dial_code: "+1340"
  },
  {
    name: "Wallis and Futuna",
    flag: "🇼🇫",
    code: "WF",
    dial_code: "+681"
  },
  {
    name: "Yemen",
    flag: "🇾🇪",
    code: "YE",
    dial_code: "+967"
  },
  {
    name: "Zambia",
    flag: "🇿🇲",
    code: "ZM",
    dial_code: "+260"
  },
  {
    name: "Zimbabwe",
    flag: "🇿🇼",
    code: "ZW",
    dial_code: "+263"
  }
];

// src/components/ui-phone-input/ui-phone-input.tsx
import { jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
"use client";
function PhoneInput(props) {
  const {
    label,
    placeholder = "Phone number",
    className,
    defaultCountry = "United States",
    formik,
    name
  } = props;
  const currentValue = formik && name ? formik.values?.[name] ?? "" : props.value;
  const [selectedCountryName, setSelectedCountryName] = useState5(defaultCountry);
  const sortedCountries = useMemo3(() => {
    return [...countries_default].sort((a, b) => b.dial_code.length - a.dial_code.length);
  }, []);
  const { countryCode, phoneNumber, activeCountryName } = useMemo3(() => {
    if (!currentValue) {
      const defaultData = countries_default.find((c) => c.name === defaultCountry);
      return {
        countryCode: defaultData?.dial_code || "+1",
        phoneNumber: "",
        activeCountryName: defaultData?.name || "United States"
      };
    }
    const cleanValue = currentValue.replace(/-/g, "").replace(/\s/g, "");
    let matchedCountryCode = "";
    let numberPart = "";
    if (cleanValue.startsWith("+")) {
      const matched = sortedCountries.find((c) => cleanValue.startsWith(c.dial_code));
      if (matched) {
        matchedCountryCode = matched.dial_code;
        numberPart = cleanValue.substring(matched.dial_code.length);
      }
    }
    if (!matchedCountryCode) {
      const defaultData = countries_default.find((c) => c.name === defaultCountry);
      matchedCountryCode = defaultData?.dial_code || "+1";
      numberPart = currentValue.replace(/\D/g, "");
    }
    const currentSelectedData = countries_default.find((c) => c.name === selectedCountryName);
    if (currentSelectedData && currentSelectedData.dial_code === matchedCountryCode) {
      return {
        countryCode: matchedCountryCode,
        phoneNumber: formatPhoneNumber(numberPart),
        activeCountryName: selectedCountryName
      };
    }
    const newMatch = countries_default.find((c) => c.dial_code === matchedCountryCode);
    return {
      countryCode: matchedCountryCode,
      phoneNumber: formatPhoneNumber(numberPart),
      activeCountryName: newMatch?.name || "United States"
    };
  }, [currentValue, defaultCountry, selectedCountryName, sortedCountries]);
  useEffect5(() => {
    if (activeCountryName !== selectedCountryName) {
      setSelectedCountryName(activeCountryName);
    }
  }, [activeCountryName, selectedCountryName]);
  const countryOptions = useMemo3(() => {
    return countries_default.map((c) => ({
      value: c.name,
      label: c.dial_code,
      icon: c.flag,
      searchLabel: `${c.name} ${c.dial_code}`
    }));
  }, []);
  const handleCountryChange = useCallback((newCountryName) => {
    const country = countries_default.find((c) => c.name === newCountryName);
    if (country) {
      setSelectedCountryName(country.name);
      const cleanNumber = phoneNumber.replace(/\D/g, "");
      const newValue = `${country.dial_code}-${cleanNumber}`;
      if (formik && name) {
        formik.setFieldValue(name, newValue);
        formik.setFieldTouched(name, true);
      } else {
        const onChange = props.onChange;
        onChange(newValue);
      }
    }
  }, [phoneNumber, formik, name, props]);
  const handleNumberChange = useCallback((e) => {
    const input = e.target.value;
    const numericValue = input.replace(/\D/g, "");
    const newValue = numericValue === "" ? "" : `${countryCode}-${numericValue}`;
    if (formik && name) {
      formik.setFieldValue(name, newValue);
    } else {
      const onChange = props.onChange;
      onChange(newValue);
    }
  }, [countryCode, formik, name, props]);
  const renderCountryOption = useCallback((option) => {
    const name2 = option.searchLabel ? option.searchLabel.substring(0, option.searchLabel.lastIndexOf(" ")) : "";
    return /* @__PURE__ */ jsxDEV13("span", {
      className: "flex items-center gap-2",
      children: [
        /* @__PURE__ */ jsxDEV13("span", {
          children: option.icon
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV13("span", {
          className: "text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap",
          children: name2
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV13("span", {
          className: "font-medium",
          children: option.label
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }, []);
  return /* @__PURE__ */ jsxDEV13("div", {
    className: cx("form-group", className),
    children: [
      label && /* @__PURE__ */ jsxDEV13("label", {
        children: label
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV13("div", {
        className: "phone-input-container",
        children: [
          /* @__PURE__ */ jsxDEV13("div", {
            className: "phone-input-code-selector",
            children: /* @__PURE__ */ jsxDEV13(ui_combobox_default, {
              options: countryOptions,
              value: activeCountryName,
              onChange: handleCountryChange,
              className: "phone-input-combobox",
              matchTriggerWidth: false,
              renderOption: renderCountryOption,
              placeholder: "+1"
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV13("div", {
            className: "phone-input-separator"
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV13("input", {
            type: "tel",
            inputMode: "numeric",
            value: phoneNumber,
            onChange: handleNumberChange,
            placeholder,
            className: "phone-input-field"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this),
      formik && name && formik.touched?.[name] && formik.errors?.[name] && /* @__PURE__ */ jsxDEV13("span", {
        className: "error-message",
        children: typeof formik.errors[name] === "string" ? formik.errors[name] : "Invalid field"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function formatPhoneNumber(value) {
  if (!value)
    return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4)
    return phoneNumber;
  if (phoneNumberLength < 7) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}
var ui_phone_input_default = memo2(PhoneInput);
// src/components/ui-input/ui-input.tsx
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
function Input(props) {
  const { label, formik, name, id, ...rest } = props;
  if (formik) {
    const inputName = name;
    return /* @__PURE__ */ jsxDEV14("div", {
      className: "form-group",
      children: [
        label && /* @__PURE__ */ jsxDEV14("label", {
          htmlFor: id ?? inputName,
          children: label
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV14("input", {
          type: "text",
          id: id ?? inputName,
          name: inputName,
          value: formik.values?.[inputName] ?? "",
          onChange: formik.handleChange,
          onBlur: formik.handleBlur,
          className: cx("input", formik.touched?.[inputName] && formik.errors?.[inputName] ? "error" : ""),
          placeholder: rest.placeholder || "",
          ...rest
        }, undefined, false, undefined, this),
        formik.touched?.[inputName] && formik.errors?.[inputName] && /* @__PURE__ */ jsxDEV14("span", {
          className: "error-message",
          children: typeof formik.errors[inputName] === "string" ? formik.errors[inputName] : "Invalid field"
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
  return /* @__PURE__ */ jsxDEV14("div", {
    className: "form-group",
    children: [
      label && /* @__PURE__ */ jsxDEV14("label", {
        htmlFor: id || name,
        children: label
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV14("input", {
        type: "text",
        id: id || name,
        name,
        className: cx("input"),
        ...rest
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
// src/components/ui-select/ui-select.tsx
import { jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
function Select(props) {
  const { label, formik, name, id, children, ...rest } = props;
  if (formik) {
    const selectName = name;
    return /* @__PURE__ */ jsxDEV15("div", {
      className: "form-group",
      children: [
        label && /* @__PURE__ */ jsxDEV15("label", {
          htmlFor: id ?? selectName,
          children: label
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV15("select", {
          id: id ?? selectName,
          name: selectName,
          value: formik.values?.[selectName] ?? "",
          onChange: formik.handleChange,
          onBlur: formik.handleBlur,
          className: cx(formik.touched?.[selectName] && formik.errors?.[selectName] ? "error" : ""),
          ...rest,
          children
        }, undefined, false, undefined, this),
        formik.touched?.[selectName] && formik.errors?.[selectName] && /* @__PURE__ */ jsxDEV15("span", {
          className: "error-message",
          children: typeof formik.errors[selectName] === "string" ? formik.errors[selectName] : "Invalid field"
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
  return /* @__PURE__ */ jsxDEV15("div", {
    className: "form-group",
    children: [
      label && /* @__PURE__ */ jsxDEV15("label", {
        htmlFor: id || name,
        children: label
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV15("select", {
        id: id || name,
        name,
        ...rest,
        children
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
// src/components/ui-form-group/ui-form-group.tsx
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
function FormGroup(props) {
  const { label, formik, name, id, children, ...rest } = props;
  const isSelect = children !== undefined && children !== null;
  if (formik) {
    const fieldName = name;
    if (isSelect) {
      const selectProps = rest;
      return /* @__PURE__ */ jsxDEV16("div", {
        className: "form-group",
        children: [
          label && /* @__PURE__ */ jsxDEV16("label", {
            htmlFor: id ?? fieldName,
            children: label
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV16("select", {
            id: id ?? fieldName,
            name: fieldName,
            value: formik.values?.[fieldName] ?? "",
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            className: cx(formik.touched?.[fieldName] && formik.errors?.[fieldName] ? "error" : ""),
            ...selectProps,
            children
          }, undefined, false, undefined, this),
          formik.touched?.[fieldName] && formik.errors?.[fieldName] && /* @__PURE__ */ jsxDEV16("span", {
            className: "error-message",
            children: typeof formik.errors[fieldName] === "string" ? formik.errors[fieldName] : "Invalid field"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this);
    } else {
      const inputProps = rest;
      return /* @__PURE__ */ jsxDEV16("div", {
        className: "form-group",
        children: [
          label && /* @__PURE__ */ jsxDEV16("label", {
            htmlFor: id ?? fieldName,
            children: label
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV16("input", {
            id: id ?? fieldName,
            name: fieldName,
            value: formik.values?.[fieldName] ?? "",
            onChange: formik.handleChange,
            onBlur: formik.handleBlur,
            className: cx("input", formik.touched?.[fieldName] && formik.errors?.[fieldName] ? "error" : ""),
            placeholder: inputProps.placeholder || "",
            ...inputProps
          }, undefined, false, undefined, this),
          formik.touched?.[fieldName] && formik.errors?.[fieldName] && /* @__PURE__ */ jsxDEV16("span", {
            className: "error-message",
            children: typeof formik.errors[fieldName] === "string" ? formik.errors[fieldName] : "Invalid field"
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this);
    }
  }
  if (isSelect) {
    const selectProps = rest;
    return /* @__PURE__ */ jsxDEV16("div", {
      className: "form-group",
      children: [
        label && /* @__PURE__ */ jsxDEV16("label", {
          htmlFor: id || name,
          children: label
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV16("select", {
          id: id || name,
          name,
          ...selectProps,
          children
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  } else {
    const inputProps = rest;
    return /* @__PURE__ */ jsxDEV16("div", {
      className: "form-group",
      children: [
        label && /* @__PURE__ */ jsxDEV16("label", {
          htmlFor: id || name,
          children: label
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV16("input", {
          id: id || name,
          name,
          className: cx("input"),
          ...inputProps
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  }
}
// src/components/ui-add-minus/ui-add-minus.tsx
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
function AddMinus(props) {
  const {
    label,
    min = 0,
    max = Infinity,
    step = 1,
    className,
    formik,
    name
  } = props;
  const currentValue = formik && name ? formik.values?.[name] ?? min : props.value;
  const handleDecrement = () => {
    const newValue = Math.max(min, currentValue - step);
    if (formik && name) {
      formik.setFieldValue(name, newValue);
    } else {
      const onChange = props.onChange;
      onChange(newValue);
    }
  };
  const handleIncrement = () => {
    const newValue = Math.min(max, currentValue + step);
    if (formik && name) {
      formik.setFieldValue(name, newValue);
    } else {
      const onChange = props.onChange;
      onChange(newValue);
    }
  };
  const isMinDisabled = currentValue <= min;
  const isMaxDisabled = currentValue >= max;
  return /* @__PURE__ */ jsxDEV17("div", {
    className: cx("form-group", className),
    children: [
      label && /* @__PURE__ */ jsxDEV17("label", {
        className: "text-sm font-medium text-text-light dark:text-text-dark",
        children: label
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV17("div", {
        className: "flex items-center space-x-3 bg-background-light dark:bg-background-dark rounded-full px-2 py-1 border border-border-light dark:border-border-dark w-fit",
        children: [
          /* @__PURE__ */ jsxDEV17("button", {
            type: "button",
            onClick: handleDecrement,
            disabled: isMinDisabled,
            className: "w-8 h-8 flex items-center justify-center rounded-full text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text-muted-light dark:disabled:hover:text-text-muted-dark",
            "aria-label": "Decrease quantity",
            children: /* @__PURE__ */ jsxDEV17(MaterialIcon, {
              name: "remove",
              className: "text-sm"
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV17("span", {
            className: "text-sm font-semibold text-text-light dark:text-text-dark w-8 text-center",
            children: currentValue
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV17("button", {
            type: "button",
            onClick: handleIncrement,
            disabled: isMaxDisabled,
            className: "w-8 h-8 flex items-center justify-center rounded-full text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text-muted-light dark:disabled:hover:text-text-muted-dark",
            "aria-label": "Increase quantity",
            children: /* @__PURE__ */ jsxDEV17(MaterialIcon, {
              name: "add",
              className: "text-sm"
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
// src/components/ui-card/ui-card.tsx
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
function Card({ className, children, ...props }) {
  return /* @__PURE__ */ jsxDEV18("div", {
    ...props,
    className: cx("bg-card-light dark:bg-card-dark rounded-xl shadow-card border border-gray-100 dark:border-gray-800", className),
    children
  }, undefined, false, undefined, this);
}
export {
  Typography,
  ThemeToggle,
  Select,
  SectionHeader,
  ui_phone_input_default as PhoneInput,
  PageShell,
  MaterialIcon,
  Input,
  Header,
  FormGroup,
  Dropdown,
  Dialog,
  DatePicker,
  ui_combobox_default as Combobox,
  Card,
  Button,
  Badge,
  AddMinus
};

//# debugId=6ACECB1A8EFE51F064756E2164756E21
