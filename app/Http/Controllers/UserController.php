<?php

namespace App\Http\Controllers;

use App\Jobs\ForgotPasswordJob;
use App\Mail\ForgotPasswordMail;
use App\Models\User;
use Aspose\Words\Model\Requests\ConvertDocumentRequest;
use Aspose\Words\Model\Requests\DeleteWatermarkOnlineRequest;
use Aspose\Words\WordsApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use \TCPDF;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function forgotPassword(Request $request)
    {
        if ($request->password) {
            if ($request->password !== $request->CPassword) {
                return [
                    'error' => 'Password and Confirm Password Mismatch.'
                ];
            } else {
                User::where('email', $request->email)->update(['password' => $request->password]);
                return [
                    'success' => 'Password reset successfully.'
                ];
            }
        } else {
            return [
                'error' => 'Password and Confirm Password Mismatch.'
            ];
        }
    }

    public function checkEmail(Request $request)
    {
        $user = User::where('email', $request[0])->first();
        if ($user) {
            dispatch(new ForgotPasswordJob($user));
            return [
                'msg' => "success"
            ];
        } else {
            return [
                'msg' => "error"
            ];
        }

    }

    public function userLogin(Request $request)
    {

        $user = User::where('email', $request->email)->first();

        if ($user) {
            if ($user->password == $request->password) {
                Auth::setUser($user);
                return response()->json(['success' => "Login Successfully", "email" => $user->email]);
            } else {
                return response()->json(['passwordError' => "Password mismatched"]);
            }
        } else {
            return response()->json(['emailError' => "user not found"]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $email = User::where('email', $request->email)->first();
        if (!$email) {
            $user = User::updateOrcreate(
                [
                    'id' => $request->id
                ],
                [
                    'firstname' => $request->fname,
                    'lastname' => $request->lname,
                    'email' => $request->email,
                    'password' => $request->password,
                ]
            );

            if ($user) {
                return response()->json(["msg" => "success"]);
            } else {
                return response()->json(["msg" => "error"]);
            }
        } else {
            return response()->json(["emailNotFound" => "error"]);
        }
    }

    public function pdfWatermark()
    {


// Load the PDF file
        $inputFilename = asset('/assets/pdftest.pdf');
        $pdf = new TCPDF();
        TCPDF::set($inputFilename);

// Iterate through each page of the PDF
        for ($i = 1; $i <= $pdf->getNumPages(); $i++) {
            // Remove the watermark from the page
            $page = $pdf->getPage($i);
            $content = $page['content'];
            $watermarkIndex = strpos($content, 'WATERMARK');
            if ($watermarkIndex !== false) {
                $page['content'] = substr($content, 0, $watermarkIndex) .
                    substr($content, $watermarkIndex + 9);
                $pdf->setPage($i, $page);
            }
        }

// Save the modified PDF back to disk
        $outputFilename = 'output.pdf';
        $pdf->Output($outputFilename, 'F');
//        return view('test');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
