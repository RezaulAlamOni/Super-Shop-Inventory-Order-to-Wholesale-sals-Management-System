<?php

use App\jan;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $temp_jans = [
                [ 'name' => 'トマト', 'jan' => '20000011'],
                [ 'name' => '人参', 'jan' => '20000028'],
                [ 'name' => 'パプリカ', 'jan' => '20000035'],
                [ 'name' => 'トウモロコシ', 'jan' => '20000042'],
                [ 'name' => 'レタス', 'jan' => '20000059'],
                [ 'name' => 'きゅうり', 'jan' => '20000066'],
                [ 'name' => 'ナス', 'jan' => '20000073'],
                [ 'name' => 'ジャガイモ', 'jan' => '20000080']
            ];
        foreach ($temp_jans as $jan) {
            if (! \App\vendor_item::where('jan',$jan['jan'])->first()) {
                $products = [
                    'jan' => $jan['jan'],
                    'cost_price' => 100,
                    'vendor_id' => 1,
                    'selling_price' => 120,
                    'gross_profit' => 20,
                    'gross_profit_margin' => 20,
                    "start_date" => date('Y-m-d H:i:s')
                ];
                $vendor_item = \App\vendor_item::insert($products);
                jan::insert([
                    "jan" => $jan['jan'],
                    "name" => $jan['name'],
                    "case_inputs" => 24,
                    "ball_inputs" => 6,
                    "jan_start_date" => date('Y-m-d H:i:s'),
                    "jan_end_date" => date('Y-m-d H:i:s'),
                ]);
            }

        }

    }
}
