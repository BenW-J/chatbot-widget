<!-- Chat Widget -->
<div x-data="chatBot()" class="fixed bottom-4 right-4 z-50">
  <!-- Floating button -->
  <button x-show="!open" @click="open = true" class="w-14 h-14 rounded-full bg-blue-500 text-white text-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition">
    💬
  </button>

  <!-- Chat Window -->
  <div x-show="open" x-transition:enter="transition ease-out duration-300"
       x-transition:enter-start="opacity-0 scale-90"
       x-transition:enter-end="opacity-100 scale-100"
       x-transition:leave="transition ease-in duration-200"
       x-transition:leave-start="opacity-100 scale-100"
       x-transition:leave-end="opacity-0 scale-90"
       class="w-80 h-[500px] flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden"
       @click.away="open = false">
       
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-3 border-b bg-white">
      <div class="flex items-center gap-2">
        <img src="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png" class="w-6 h-6 rounded-full" />
        <div class="font-semibold text-sm">Connie</div>
      </div>
      <button @click="open = false" class="text-gray-400 hover:text-gray-600 text-lg">−</button>
    </div>

    <!-- Chat Area -->
    <div id="messages" class="flex-1 flex flex-col space-y-4 p-3 overflow-y-auto scroll-smooth">
      <template x-for="(message, key) in messages" :key="key">
        <div>
          <div class="flex items-end" :class="message.from === 'bot' ? '' : 'justify-end'">
            <div class="flex flex-col space-y-2 text-md leading-tight max-w-xs mx-2"
                 :class="message.from === 'bot' ? 'order-2 items-start' : 'order-1 items-end'">
              <div>
                <span class="px-4 py-3 rounded-xl inline-block"
                      :class="message.from === 'bot' ? 'rounded-bl-none bg-gray-100 text-gray-600' : 'rounded-br-none bg-blue-500 text-white'"
                      x-html="message.text"></span>
              </div>
            </div>
            <img :src="message.from === 'bot' ? 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png' : 'https://i.pravatar.cc/100?img=7'"
                 class="w-6 h-6 rounded-full" :class="message.from === 'bot' ? 'order-1' : 'order-2'" />
          </div>
        </div>
      </template>

      <!-- Typing indicator -->
      <div x-show="botTyping" class="flex items-start space-x-2">
        <img src="https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png" class="w-6 h-6 rounded-full">
        <img src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif" class="w-16" />
      </div>
    </div>

    <!-- Input Section -->
    <div class="border-t-2 border-gray-200 px-4 pt-4 pb-3 bg-white">
      <div class="relative flex items-center">
        <input type="text" placeholder="Say something..." autocomplete="off" autofocus
               @keydown.enter="updateChat($event.target)"
               class="w-full px-4 py-2 rounded-full border-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-gray-100"
               x-ref="input" />
        <button @click.prevent="updateChat($refs.input)"
                class="absolute right-2 inline-flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full">
          <i class="mdi mdi-arrow-right text-xl"></i>
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Include MDI + Alpine -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css">
<script src="https://cdn.jsdelivr.net/npm/alpinejs@2.8.2" defer></script>
