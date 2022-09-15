<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\FamilyRequest;
use App\Http\Resources\FamilyResource;
use App\Models\Family;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Response;

class FamilyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $families = Family::all();
        return response(['status' => 'success', 'data' => $families]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param FamilyRequest $request
     * @return Application|ResponseFactory|Response
     */
    public function store(FamilyRequest $request): Application|ResponseFactory|Response
    {
        $family = Family::create($request->validated());
        return response(['status' => 'success', 'data' => new FamilyResource($family)]);
    }

    /**
     * Display the specified resource.
     *
     * @param Family $family
     * @return Response
     */
    public function show(Family $family): Response
    {
        $family = Family::find($family);

        if(is_null($family)){
            return response(['status' => 'fail', 'data' => 'Ce sport n\'est pas disponible'], 404);
        }

        return response(['status' => 'success', 'data' => $family]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param FamilyRequest $request
     * @param Family $family
     * @return Response
     */
    public function update(FamilyRequest $request, Family $family): Response
    {
        $family->update($request->validated());
        return response(['status' => 'success', 'data' => new FamilyResource($family)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Family $family
     * @return Response
     */
    public function destroy(Family $family): Response
    {
        $family->delete();
        return response(['status' => 'success', 'data' => 'Family supprimé !']);
    }
}
