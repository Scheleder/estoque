<button {{ $attributes->merge([
    'type' => 'button',
    'class' => 'inline-flex justify-center w-48 px-4 py-3
    bg-secondary  border border-gray-300
    rounded-md
    font-semibold text-xs text-white
    uppercase tracking-widest shadow-sm hover:opacity-75
    focus:outline-none focus:ring-2
    focus:ring-offset-2
    disabled:opacity-25 transition ease-in-out duration-150'
    ]) }}>
    {{ $slot }}
</button>
