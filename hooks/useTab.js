import * as React from "react"

const TAB_BREAKPOINT = 768

export function useIsTab() {
  const [isTab, setIsTab] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TAB_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsTab(window.innerWidth < TAB_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsTab(window.innerWidth < TAB_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isTab
}
