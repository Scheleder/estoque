<button {{ $attributes->merge([
    'type' => 'submit',
    'class' => 'inline-flex justify-center px-4 py-3
    bg-cor-80 w-48 hover:opacity-75
    border border-transparent rounded-md
    font-semibold text-xs text-white uppercase tracking-widest
    focus:outline-none focus:ring-2
    focus:ring-offset-2 
    transition ease-in-out duration-150']) }}>
    {{ $slot }}
</button>
