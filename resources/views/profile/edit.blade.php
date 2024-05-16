<x-app-layout>

        <div class="py-12">
            <div class="max-w-sm p-2 sm:max-w-md md:max-w-xl mx-auto sm:px-6 lg:px-8 space-y-6 place-content-center">
                <div class="p-4 sm:p-8 bg-claro dark:bg-gray-800 shadow sm:rounded-lg">
                    <div class="max-w-xl">
                        @include('profile.partials.update-profile-information-form')
                    </div>
                </div>

                <div class="p-4 sm:p-8 bg-claro dark:bg-gray-800 shadow sm:rounded-lg">
                    <div class="max-w-xl">
                        @include('profile.partials.update-image-form')
                    </div>
                </div>

                <div class="p-4 sm:p-8 bg-claro dark:bg-gray-800 shadow sm:rounded-lg">
                    <div class="max-w-xl">
                        @include('profile.partials.change-theme-form')
                    </div>
                </div>

                <div class="p-4 sm:p-8 bg-claro dark:bg-gray-800 shadow sm:rounded-lg">
                    <div class="max-w-xl">
                        @include('profile.partials.update-options-form')
                    </div>
                </div>

                <div class="p-4 sm:p-8 bg-claro dark:bg-gray-800 shadow sm:rounded-lg">
                    <div class="max-w-xl">
                        @include('profile.partials.update-password-form')
                    </div>
                </div>

                <div class="p-4 sm:p-8 bg-claro dark:bg-gray-800 shadow sm:rounded-lg">
                    <div class="max-w-xl">
                        @include('profile.partials.delete-user-form')
                    </div>
                </div>
            </div>
        </div>
    </x-app-layout>
