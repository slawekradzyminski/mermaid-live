import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
  group?: string
}

export interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  options: SelectOption[]
  className?: string
  disabled?: boolean
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onValueChange, placeholder = "Select an option", options, className, disabled = false }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(value || "")

    React.useEffect(() => {
      setSelectedValue(value || "")
    }, [value])

    const handleSelect = (optionValue: string) => {
      setSelectedValue(optionValue)
      onValueChange?.(optionValue)
      setIsOpen(false)
    }

    const selectedOption = options.find(option => option.value === selectedValue)
    
    // Group options by group property
    const groupedOptions = React.useMemo(() => {
      const groups: Record<string, SelectOption[]> = {}
      const ungrouped: SelectOption[] = []
      
      options.forEach(option => {
        if (option.group) {
          if (!groups[option.group]) {
            groups[option.group] = []
          }
          groups[option.group].push(option)
        } else {
          ungrouped.push(option)
        }
      })
      
      return { groups, ungrouped }
    }, [options])

    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={cn(
            selectedOption ? "text-foreground" : "text-muted-foreground"
          )}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover shadow-md">
            <div className="p-1">
              {groupedOptions.ungrouped.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                    selectedValue === option.value && "bg-accent text-accent-foreground"
                  )}
                >
                  {option.label}
                </button>
              ))}
              
              {Object.entries(groupedOptions.groups).map(([groupName, groupOptions]) => (
                <div key={groupName} className="mt-2 first:mt-0">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {groupName}
                  </div>
                  {groupOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      className={cn(
                        "w-full text-left px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground",
                        "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                        selectedValue === option.value && "bg-accent text-accent-foreground"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Backdrop to close dropdown */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    )
  }
)

Select.displayName = "Select"

export { Select } 