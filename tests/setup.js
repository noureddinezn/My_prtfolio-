import { vi, afterEach } from 'vitest'
import { enableAutoUnmount } from '@vue/test-utils'
enableAutoUnmount(afterEach)
class Observer { observe() {} unobserve() {} disconnect() {} }
vi.stubGlobal('IntersectionObserver', Observer)
HTMLDialogElement.prototype.showModal = function () { this.open = true }
HTMLDialogElement.prototype.close = function () { this.open = false }
