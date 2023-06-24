export default class HigherOrderTapProxy {
    /**
     * The target being tapped.
     *
     * @var {any}
     */
    public target: any;

    /**
     * Create a new tap proxy instance.
     *
     * @param   {any}  target
     *
     * @return {void}
     *
     */
    constructor (target: any) {
        this.target = target;
    }
}
