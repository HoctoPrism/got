<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CharacterRequest;
use App\Http\Resources\CharacterResource;
use App\Models\Character;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;

class CharacterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $characters = Character::with(['family'])->get();
        return response(['status' => 'success', 'data' => $characters]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CharacterRequest $request
     * @return Application|ResponseFactory|Response
     */
    public function store(CharacterRequest $request): Application|ResponseFactory|Response
    {
        $character = Character::create($request->validated());
        return response(['status' => 'success', 'data' => new CharacterResource($character)]);
    }

    /**
     * Display the specified resource.
     *
     * @param Character $character
     * @return Response
     */
    public function show(Character $character): Response
    {
        $character->load(['family']);
        return response(['status' => 'success', 'data' => $character]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CharacterRequest $request
     * @param Character $character
     * @return Response
     */
    public function update(CharacterRequest $request, Character $character): Response
    {
        $character->update($request->validated());
        return response(['status' => 'success', 'data' => new CharacterResource($character)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Character $character
     * @return Response
     */
    public function destroy(Character $character): Response
    {
        $character->delete();
        return response(['status' => 'success', 'data' => 'Character supprimé !']);
    }
}
