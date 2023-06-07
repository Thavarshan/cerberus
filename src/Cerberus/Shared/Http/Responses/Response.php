<?php

namespace Cerberus\Shared\Http\Responses;

use Illuminate\Routing\Redirector;
use Illuminate\Http\RedirectResponse;
use App\Providers\RouteServiceProvider;
use Illuminate\Routing\ResponseFactory;
use Cerberus\Contracts\Shared\Responsable;
use Illuminate\View\Factory as ViewFactory;

abstract class Response extends ResponseFactory implements Responsable
{
    /**
     * Optional content.
     *
     * @var mixed|null
     */
    protected $content;

    /**
     * Create a new response factory instance.
     *
     * @param \Illuminate\Contracts\View\Factory $view
     * @param \Illuminate\Routing\Redirector     $redirector
     * @param mixed|null                         $content
     *
     * @return void
     */
    public function __construct(
        ViewFactory $view,
        Redirector $redirector,
        $content = null
    ) {
        parent::__construct($view, $redirector);

        $this->content = $content;
    }

    /**
     * Dispatch response.
     *
     * @param mixed|null $content
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    public static function dispatch(mixed $content = null): Responsable
    {
        return new static(
            app(ViewFactory::class),
            app(Redirector::class),
            $content
        );
    }

    /**
     * Full URL path to home route.
     *
     * @return string
     */
    public function home(): string
    {
        return url(RouteServiceProvider::HOME);
    }

    /**
     * Get instance of routin redirector class.
     *
     * @return \Illuminate\Routing\Redirector
     */
    public function redirect(): Redirector
    {
        return $this->redirector;
    }

    /**
     * Create a new redirect response to the previous location.
     *
     * @param int   $status
     * @param array $headers
     * @param mixed $fallback
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function back(
        int $status = 302,
        array $headers = [],
        bool $fallback = false
    ): RedirectResponse {
        return $this->redirect()->back($status, $headers, $fallback);
    }

    /**
     * Get the optional content.
     *
     * @var mixed|null
     */
    public function content(): mixed
    {
        return $this->content;
    }
}
