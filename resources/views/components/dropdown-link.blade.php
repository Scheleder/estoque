<a {{ $attributes->merge([
    'class' => 'block w-full px-4 py-2
    text-left text-sm leading-5
    text-cor-70
    hover:bg-cor-50
    hover:text-claro
    focus:outline-none
    focus:bg-cor-60
    transition duration-150 ease-in-out'
    ]) }}>{{ $slot }}</a>
