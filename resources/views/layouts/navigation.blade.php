<nav x-data="{ open: false }" class="bg-gradient-to-r from-cor-80 to-cor-60 fixed w-full z-10">
    <!-- Primary Navigation Menu -->
    <div class="max-w-7xl mx-auto px-2">
        <div class="flex justify-between h-16">
            <div class="flex">
                <!-- Logo -->
                <div class="shrink-0 flex items-center ml-2 mr-8">
                    <a href="{{ route('dashboard') }}">
                        <x-application-logo class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    </a>
                </div>

                <!-- Navigation Links -->
                <div class="hidden space-x-6 sm:-my-px sm:ml-10 sm:flex">
                {{-- <div class="space-x-6 -my-px flex"> --}}
                    <x-nav-link :href="route('client.all')" :active="request()->routeIs('client.all')">
                        {{ __('Clients') }}
                    </x-nav-link>
                    <x-nav-link :href="route('sale.all')" :active="request()->routeIs('sale.all')">
                        {{ __('Sales') }}
                    </x-nav-link>
                    <x-nav-link :href="route('payment.all')" :active="request()->routeIs('payment.all')">
                        {{ __('Payments') }}
                    </x-nav-link>
                    @if(Auth::user()->configuration->product)
                    <x-nav-link :href="route('product.all')" :active="request()->routeIs('product.all')">
                        {{ __('Products') }}
                    </x-nav-link>
                    @endif
                </div>
            </div>

            <!-- Settings Dropdown -->
            <div class="hidden sm:flex sm:items-center sm:ml-6">
            {{-- <div class="flex items-center ml-6"> --}}
                <x-dropdown align="right" width="48">
                    <x-slot name="trigger" class="relative">
                        <button class="inline-flex items-center px-3 py-2 border border-transparent text-sm bg-bege dark:bg-cinza leading-4 rounded-md focus:outline-none transition ease-in-out duration-150">
                            <div class="max-md:hidden font-bold text-cor-60 hover:text-cor-50 dark:text-cinza-claro" >{{ Auth::user()->name }}</div>
                            <div class="ml-1">
                                <svg class="fill-current h-4 w-4 font-bold text-cor-60 hover:text-cor-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            @if( strlen(auth()->user()->configuration->notes) >0 )
                                <a href="/notepad"><i class="absolute text-cor-60 top-1 right-1 fas fa-bell"></i></a>
                            @endif
                            <img class="w-8 h-8 rounded-full ml-2" src="/img/users/{{ Auth::user()->configuration->image }}" alt="user photo">
                        </button>

                    </x-slot>

                    <x-slot name="content">
                        <div class="sm:hidden text-sm text-center p-2">{{ Auth::user()->name }}</div>

                        <x-dropdown-link :href="route('notepad')">
                            {{ __('Notepad') }}
                        </x-dropdown-link>

                        <x-dropdown-link :href="route('profile.edit')">
                            {{ __('Profile') }}
                        </x-dropdown-link>

                        <!-- Authentication -->
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf

                            <x-dropdown-link :href="route('logout')"
                                    onclick="event.preventDefault();
                                                this.closest('form').submit();">
                                {{ __('Log Out') }}
                            </x-dropdown-link>
                        </form>
                    </x-slot>
                </x-dropdown>
            </div>

            <!-- Hamburger -->
            <div class="mr-2 flex items-center sm:hidden">
                <button @click="open = ! open" class="inline-flex items-center justify-center p-2 rounded-md text-claro focus:outline-none focus:bg-claro focus:text-cinza transition duration-150 ease-in-out">
                    <svg class="h-6 w-8" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path :class="{'hidden': open, 'inline-flex': ! open }" class="inline-flex hover:text-cor-70" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        <path :class="{'hidden': ! open, 'inline-flex': open }" class="hidden hover:text-danger" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Responsive Navigation Menu -->
    <div class="pt-2 pb-3 px-8 flex justify-between sm:hidden">

        <x-nav-link :href="route('client.all')" :active="request()->routeIs('client.all')">
            {{ __('Clients') }}
        </x-nav-link>
        <x-nav-link :href="route('sale.all')" :active="request()->routeIs('sale.all')">
            {{ __('Sales') }}
        </x-nav-link>
        <x-nav-link :href="route('payment.all')" :active="request()->routeIs('payment.all')">
            {{ __('Payments') }}
        </x-nav-link>
        @if(Auth::user()->configuration->product)
        <x-nav-link :href="route('product.all')" :active="request()->routeIs('product.all')">
            {{ __('Products') }}
        </x-nav-link>
        @endif

    </div>

    <div :class="{'block': open, 'hidden': ! open}" class="hidden sm:hidden relative">
        <!-- Responsive Settings Options -->
        <div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600 bg-blue-100 absolute z-50">
            <div class="px-4">
                <div class="font-medium text-base text-gray-800 dark:text-gray-200">{{ Auth::user()->name }}</div>
                <div class="font-medium text-sm text-gray-500">{{ Auth::user()->email }}</div>
            </div>

            <div class="mt-3 space-y-1">
                <x-responsive-nav-link :href="route('notepad')">
                    {{ __('NotePad') }}
                </x-responsive-nav-link>

                <x-responsive-nav-link :href="route('profile.edit')">
                    {{ __('Profile') }}
                </x-responsive-nav-link>

                <!-- Authentication -->
                <form method="POST" action="{{ route('logout') }}">
                    @csrf

                    <x-responsive-nav-link :href="route('logout')"
                            onclick="event.preventDefault();
                                        this.closest('form').submit();">
                        {{ __('Log Out') }}
                    </x-responsive-nav-link>
                </form>
            </div>
        </div>
    </div>
</nav>
