<button {{ $attributes->merge([
    'type' => 'submit',
    'class' => 'inline-flex justify-center
    px-4 py-3 w-48 bg-danger border border-transparent
    rounded-md font-semibold text-xs text-white
    uppercase tracking-widest hover:bg-danger/75
    active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150']) }}>
    {{ $slot }}
</button>
