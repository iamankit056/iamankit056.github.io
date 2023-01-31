class Utils
{
    static Lerp(a, b, x) {
        return a + (b-a) * x;
    }

    static Random(min=0, max=1) {
        return Math.random() * (max-min) + min;
    }

    static Clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}