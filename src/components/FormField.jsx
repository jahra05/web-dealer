
import { useEffect, useState } from "react"

function FormField({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    options = [],
    name,
    required = false,
    disabled = false,
    accept,
    initialPreview,
    ...props
}) {
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (type !== "file") {
            setPreview("")
            return
        }

        // Jika value berupa URL foto lama
        if (typeof value === "string") {
            setPreview(value)
            return
        }

        // Jika belum memilih foto baru
        if (!value) {
            setPreview(initialPreview || "")
            return
        }

        // Jika memilih file foto baru
        const url = URL.createObjectURL(value)
        setPreview(url)

        return () => URL.revokeObjectURL(url)
    }, [type, value, initialPreview])

    const className =
        "w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"

    const commonProps = {
        name,
        placeholder,
        required,
        disabled,
        className,
        ...props,
    }

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="mb-2 mt-3 block text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}

            {type === "file" ? (
                <div className="space-y-3">
                    <input
                        {...commonProps}
                        id={name}
                        type="file"
                        accept={accept}
                        onChange={(e) => {
                            onChange?.(e.target.files?.[0] || null)
                        }}
                    />

                    {preview && (
                        <img
                            src={preview}
                            alt="Preview foto"
                            className="h-32 w-32 rounded-xl border object-cover"
                        />
                    )}
                </div>
            ) : type === "textarea" ? (
                <textarea
                    {...commonProps}
                    id={name}
                    value={value ?? ""}
                    rows={4}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            ) : type === "select" ? (
                <select
                    {...commonProps}
                    id={name}
                    value={value ?? ""}
                    onChange={(e) => onChange?.(e.target.value)}
                >
                    <option value="">
                        {placeholder || "Pilih opsi"}
                    </option>

                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    {...commonProps}
                    id={name}
                    type={type}
                    value={value ?? ""}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            )}
        </div>
    )
}

export default FormField
