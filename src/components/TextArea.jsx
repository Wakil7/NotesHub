import React, { useId } from "react";

const TextArea = React.forwardRef(
    function TextArea({
        label,
        rows = 4,
        className = "",
        ...props
    }, ref) {
        const id = useId();
        return (
            <div className="w-full">
                {label && (
                    <label className="inline-block mb-1 pl-1" htmlFor={id}>
                        {label}
                    </label>
                )}
                <textarea
                    id={id}
                    ref={ref}
                    rows={rows}
                    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full resize-none ${className}`}
                    {...props}
                />
            </div>
        );
    }
);

export default TextArea;
