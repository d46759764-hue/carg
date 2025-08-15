const TYPE_STYLES = {
    info: "bg-slate-800 border-slate-700",
    success: "bg-emerald-700/30 border-emerald-500/40",
    warn: "bg-amber-700/30 border-amber-500/40",
    error: "bg-rose-700/30 border-rose-500/40",
};
export class ToastManager {
    constructor(rootSelector = "#toast-root") {
        this.timers = new Map();
        const root = document.querySelector(rootSelector);
        if (!root)
            throw new Error("Toast root introuvable.");
        this.root = root;
    }
    show(opt) {
        const id = opt.id ?? `t_${crypto.randomUUID()}`;
        const type = opt.type ?? "info";
        const duration = opt.durationMs ?? 3500;
        const el = document.createElement("div");
        el.dataset.toastId = id;
        el.className = `rounded-md border px-3 py-2 text-sm shadow-lg ${TYPE_STYLES[type]} toast-enter`;
        el.textContent = opt.message;
        // Pause on hover
        let remaining = duration;
        let start = Date.now();
        const schedule = () => {
            this.clearTimer(id);
            const t = window.setTimeout(() => this.dismiss(id), remaining);
            this.timers.set(id, t);
            start = Date.now();
        };
        el.addEventListener("mouseenter", () => {
            remaining -= Date.now() - start;
            this.clearTimer(id);
        });
        el.addEventListener("mouseleave", () => schedule());
        el.addEventListener("click", () => this.dismiss(id));
        this.root.appendChild(el);
        schedule();
        return id;
    }
    dismiss(id) {
        const el = this.root.querySelector(`[data-toast-id="${id}"]`);
        if (el) {
            el.classList.add("toast-exit");
            window.setTimeout(() => el.remove(), 300);
        }
        this.clearTimer(id);
    }
    clearTimer(id) {
        const t = this.timers.get(id);
        if (t !== undefined) {
            window.clearTimeout(t);
            this.timers.delete(id);
        }
    }
}
