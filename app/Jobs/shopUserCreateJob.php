<?php

namespace App\Jobs;

use Illuminate\Foundation\Bus\Dispatchable;
use App\User;
use App\customer_shop;
use Log;
class shopUserCreateJob
{
    use Dispatchable;
    protected $user_info;
    protected $shop_info;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user_info,$shop_info)
    {
        $this->user_info = $user_info;
        $this->shop_info = $shop_info;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try{
            Log::info('insert shop secondary');
        $User = new User;
        $customer_shop = new customer_shop;

        $User->setConnection('superv1');
        $customer_shop->setConnection('superv1');
        $user_id = $User->insertGetId($this->user_info);
        $this->shop_info['user_id']=$user_id;
        $customer_shop->insert($this->shop_info);
        }catch(\Exception $e){
            Log::info($e->getMessage());
        }
    }
}
