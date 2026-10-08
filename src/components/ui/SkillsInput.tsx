"use client"

import * as React from "react"
import { X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SkillsInputProps {
  value: string[]
  onChange: (skills: string[]) => void
  placeholder?: string
  maxSkills?: number
  maxLength?: number
  suggestions?: string[]
  className?: string
  disabled?: boolean
  label?: string
  helperText?: string
  required?: boolean
}

const DEFAULT_SUGGESTIONS = [
  "Web Design",
  "UI/UX",
  "React",
  "Next.js",
  "TypeScript",
  "Figma",
  "Tailwind CSS",
  "JavaScript",
  "Node.js",
  "Graphic Design",
  "WordPress",
  "SEO",
  "Content Writing",
  "Social Media",
  "Photography",
  "Video Editing",
]

export const SkillsInput = React.forwardRef<HTMLDivElement, SkillsInputProps>(
  (
    {
      value = [],
      onChange,
      placeholder = "Type a skill and press Enter",
      maxSkills = 20,
      maxLength = 50,
      suggestions = DEFAULT_SUGGESTIONS,
      className,
      disabled = false,
      label,
      helperText,
      required = false,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("")
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Filter suggestions based on input and exclude already added skills
    const filteredSuggestions = React.useMemo(() => {
      if (!inputValue.trim()) return suggestions.filter(s => !value.includes(s)).slice(0, 8)
      
      return suggestions
        .filter(
          (s) =>
            s.toLowerCase().includes(inputValue.toLowerCase()) &&
            !value.includes(s)
        )
        .slice(0, 6)
    }, [inputValue, suggestions, value])

    const addSkill = React.useCallback(
      (skill: string) => {
        const trimmedSkill = skill.trim()
        
        if (!trimmedSkill) return
        if (trimmedSkill.length > maxLength) return
        if (value.length >= maxSkills) return
        if (value.some(s => s.toLowerCase() === trimmedSkill.toLowerCase())) {
          setInputValue("")
          return
        }

        onChange([...value, trimmedSkill])
        setInputValue("")
        inputRef.current?.focus()
      },
      [value, onChange, maxSkills, maxLength]
    )

    const removeSkill = React.useCallback(
      (skillToRemove: string) => {
        onChange(value.filter((s) => s !== skillToRemove))
        inputRef.current?.focus()
      },
      [value, onChange]
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault()
        addSkill(inputValue)
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        removeSkill(value[value.length - 1])
      } else if (e.key === "Escape") {
        setShowSuggestions(false)
        inputRef.current?.blur()
      }
    }

    const handleAddClick = () => {
      addSkill(inputValue)
    }

    const handleSuggestionClick = (suggestion: string) => {
      addSkill(suggestion)
      setShowSuggestions(false)
    }

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {label && (
          <label className="block text-sm font-medium text-text-heading">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        {/* Skills Container with Input */}
        <div
          className={cn(
            "relative flex flex-wrap gap-2 p-3 min-h-[44px] rounded-lg border-2 border-border bg-surface transition-all",
            "focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10",
            disabled && "opacity-50 cursor-not-allowed bg-surface-alt"
          )}
          onClick={() => !disabled && inputRef.current?.focus()}
        >
          {/* Existing Skills as Badges */}
          {value.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className={cn(
                "inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-semibold",
                "bg-primary/10 text-primary border border-primary/20",
                "transition-all duration-200",
                !disabled && "hover:bg-primary/20"
              )}
            >
              <span className="max-w-[200px] truncate">{skill}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeSkill(skill)
                  }}
                  className="inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}

          {/* Input Field */}
          <div className="flex-1 flex items-center gap-2 min-w-[120px]">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200)
              }}
              placeholder={value.length === 0 ? placeholder : ""}
              disabled={disabled || value.length >= maxSkills}
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-text-body placeholder:text-text-subtle disabled:cursor-not-allowed"
              aria-label="Add skill"
              aria-describedby={helperText ? "skills-helper" : undefined}
            />
            
            {inputValue.trim() && (
              <button
                type="button"
                onClick={handleAddClick}
                disabled={disabled}
                className={cn(
                  "inline-flex items-center justify-center w-7 h-7 rounded-md",
                  "bg-primary text-white hover:bg-primary-hover",
                  "transition-all duration-200 active:scale-95",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
                aria-label="Add skill"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Helper Text */}
        {helperText && (
          <p id="skills-helper" className="text-xs text-text-subtle">
            {helperText} {value.length > 0 && `(${value.length}/${maxSkills})`}
          </p>
        )}

        {/* Suggestions */}
        {showSuggestions && filteredSuggestions.length > 0 && !disabled && (
          <div
            className="p-2 rounded-lg border border-border bg-surface shadow-card space-y-1"
            role="listbox"
            aria-label="Skill suggestions"
          >
            <p className="px-2 py-1 text-xs font-semibold text-text-muted uppercase tracking-wide">
              {inputValue.trim() ? "Matching skills" : "Suggestions"}
            </p>
            <div className="flex flex-wrap gap-2">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    "inline-flex items-center h-8 px-3 rounded-full text-xs font-medium",
                    "bg-surface-alt text-text-body border border-border",
                    "hover:bg-primary/10 hover:text-primary hover:border-primary/20",
                    "transition-all duration-200 active:scale-95",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                  )}
                  role="option"
                  aria-selected="false"
                >
                  <Plus className="w-3 h-3 mr-1.5" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

SkillsInput.displayName = "SkillsInput"
