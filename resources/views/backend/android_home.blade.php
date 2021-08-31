@extends('backend.layouts.master')
@section('title')
    <title>{{__('messages.dashboard_text')}}</title>
@endsection

@section('content')

    <div class="main-content-container container-fluid px-4">
        <!-- Small Stats Blocks -->
        <div class="row">
            <div class="well handy_main" style="border: 3px solid #428bca;width:100%">

                <div class="well-sm header" style="font-size: 18px; ">
                    <div class="row">
                        <div class="col-5 pull-left" style="padding: 0;font-size: 22px;">
                            <p class="handy_top_bar1">問屋用メニュー</p>
                        </div>

                        <div class="col-7 pull-right" style="text-align: right; padding: 0; font-size: 24px;">
                            <p class="handy_top_bar2"><a class="backtoHomeFromAndroid" href="{{config('app.url').'/home'}}">業務選択</a>
                          <!--  <p class="handy_top_bar2"><button class="backtoHomeFromAndroid visible-sm visible-xs hidden-md hidden-lg" id="installApp">アプリを作る</button></p>
                            </p>-->

                        </div>
                    </div>
                </div>

                <div class="row marginboths">
                    <div class="col-6 handy_btn_aria handy_btn_left">
                        <!-- <a class="btn btn-default" id="wholesale_handy" href="handy_quotation"> -->
                        <a style="padding: 15px 5px;" class="btn btn-default tourokobtn" id="wholesale_handy" href="{{ route('inventory.inquiry') }}"> <!--inventoryentrybyhandy-->
                            <div class="numbering_col" style="padding: 0; margin: 0;">1</div>
                            <!-- <div class="col-md-11 text-center" style="padding: 0; margin: 0;line-height:35px;">見積り</div> -->
                            <div class="col-md-11 text-center btnText oneLine" style="padding: 0; margin: 0;line-height:35px;">
                            見積り
                            </div>
                        </a>
                        

                        <a id="handy_order_btn" style="width: 100%;" class="btn btn-default tourokobtn" href="handy_vendor_master">
                            <div class="numbering_col" style="padding: 0; margin: 0;">3</div>
                            <div class="col-md-11 text-center btnText twoLine" style="padding: 0; margin: 0;line-height:35px;">
                            仕入<br>マスター
                            </div>
                        </a>
                        <!-- handy_stock url to -->
                        <a id="handy_order_btn" style="width: 100%;padding: 15px 5px;" class="btn btn-default orderbtnhandy" href="{{ route('handy.store.order') }}">
                            <div class="numbering_col" style="padding: 0; margin: 0;">5</div>
                            <div class="col-md-11 text-center btnText oneLine" style="padding: 0; margin: 0;line-height:35px;">
                                発注
                            </div>
                        </a>
                        
                        <a id="physical_handy" class="btn btn-default orderbtnhandy"
                           href="{{ route('handy.stock.product') }}">
                            <div class="numbering_col" style="padding: 0; margin: 0;">7</div>
                            <div class="col-md-11 text-center btnText twoLine" style="padding: 0; margin: 0;line-height:35px;">
                                棚・入庫<br>(正常保管)
                            </div>
                        </a>
                        
                       <!-- <a id="delivery_inventorys" class="btn btn-default kouri_shipment_btn" href="{{ route('order.kouri.confirm') }}">
                            <div class="numbering_col" style="padding: 0; margin: 0;">9</div>
                            <div class="col-md-11 text-center btnText oneLine" style="padding: 0; margin: 0;line-height:35px;">
                            受注確定
                            </div>
                        </a>-->

                        <a id="delivery_inventorys" class="btn btn-default kouri_shipment_btn" href="{{ route('order.shipment.list') }}">
                            <div class="numbering_col" style="padding: 0; margin: 0;">9</div>
                            <div class="col-md-11 text-center btnText oneLine" style="padding: 0; margin: 0;line-height:35px;">
                                出荷確定
                            </div>
                        </a>

                       
                        <a href="{{ route('inventory.inquiry') }}" class="btn btn-default" style="padding: 15px 5px;background:#F0FFFF;">
                            <div class="numbering_col" style="padding: 0; margin: 0;">11</div>
                            <div class="col-md-11 text-center btnText twoLine" style="padding: 0; margin: 0;line-height:35px;">
                                在庫<br>問い合わせ
                            </div>
                        </a>


                        <a  href="javascript:managementsheetPopup('vendormangementsheet')" style="padding: 15px 5px;" class="btn btn-default handymangement_sheet_btn">
                            <div class="numbering_col" style="padding: 0; margin: 0;">13</div>
                            <div class="col-md-11 text-center btnText oneLine" style="padding: 0; margin: 0;line-height:35px;">
                            買掛
                            </div>
                        </a>
                    </div>

                    <div class="col-6 handy_btn_aria handy_btn_right">
                    <a  style="width: 100%;" class="btn btn-default tourokobtn" href="handy_customer_master">
                            <div class="numbering_col" style="padding: 0; margin: 0;">2</div>
                            <div class="col-md-11 text-center btnText twoLine" style="padding: 0; margin: 0;line-height:35px;">
                            販売<br>マスター
                            </div>
                        </a>
                    <a style="padding: 15px 5px;" class="btn btn-default orderbtnhandy" id="wholesale_handy" href="{{ route('inventory.update') }}"> <!--inventoryentrybyhandy-->
                            <div class="numbering_col" style="padding: 0; margin: 0;">4</div>
                            <!-- <div class="col-md-11 text-center" style="padding: 0; margin: 0;line-height:35px;">見積り</div> -->
                            <div class="col-md-11 text-center btnText oneLine" style="padding: 0; margin: 0;line-height:35px;">
                                棚卸(在庫)
                            </div>
                        </a>
                        
                        <a href="{{Config::get('app.url').'/handy_order_receive_scan_jan'}}" class="btn btn-default orderbtnhandy"><!--"handy_order_receive_list" comment by oni 29.01.2021-->
                            <div class="numbering_col" style="padding: 0; margin: 0;">6</div>
                            <div class="col-md-11 text-center btnText twoLine" style="padding: 0; margin: 0;line-height:35px;">
                                検品仮置き<br>(一時保存)
                            </div>
                        </a>
                       
                        <a id="delivery_inventorys" class="btn btn-default kouri_shipment_btn" href="{{ route('handy.kouri.order') }}">
                            <div class="numbering_col" style="padding: 0; margin: 0;">8</div>
                            <div class="col-md-11 text-center btnText oneLine" style="padding: 0; margin: 0;line-height:35px;">
                            受注
                            </div>
                        </a>
                       
                        <a id="" style="width: 100%;background:#F0FFFF;" class="btn btn-default" href="{{ route('inventory.return') }}">
                            <div class="numbering_col" style="padding: 0; margin: 0;">10</div>
                            <div class="col-md-11 text-center btnText twoLine" style="padding: 0; margin: 0;line-height:35px;">
                                返却<br>(キャンセル)
                            </div>
                        </a>
                      

                        <a  href="{{Config::get('app.url').'/stock_details_by_handy'}}" style="padding: 15px 5px;background:#F0FFFF;" class="btn btn-default">
                            <div class="numbering_col" style="padding: 0; margin: 0;">12</div>
                            <div class="col-md-11 text-center btnText oneLine" style="padding: 0; margin: 0;line-height:35px;">
                                商品検索
                            </div>
                        </a>
                       
                       
                        <a id="" style="width: 100%;padding: 15px 5px;" class="btn btn-default handymangement_sheet_btn" href="javascript:managementsheetPopup('shipmentmangementsheet')">
                            <div class="numbering_col" style="padding: 0; margin: 0;">14</div>
                            <div class="col-md-11 text-center btnText oneLine" style="padding: 0; margin: 0;line-height:35px;">
                            売掛
                            </div>
                        </a>

                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="row">
                    <div class="col-md-12">
                        <p class="appss_install" id="installapplications">ハンディブ ラウザ インストールしますか？</p>
                    </div>
                </div>
                <!--receive handy popup-->
                <div class="content_popuparea" style="display:none;">
                    <div class="popup">
                        <div class="c_popu text-center" style="text-align: center;">
                            <h2>場所の選択をして下さい。</h2>
                            <div class="btnareas">
                                <div class="btns_blck">
                                    <a href="handy_order_receive" clicks_id="1"
                                       class="btn btn-success btnbin2 commnbin btn-lg">仮置（一時的在庫）</a>
                                </div>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <div class="btns_blck">
                                    <a href="handy_order_receive" clicks_id="2"
                                       class="btn btn-lg btn-primary commnbin btnbin4 btn-lg">棚入（通常在庫）</a>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <!--receive handy popup-->
            </div>
            <div class="clearfix"></div>
            <!--popup content-->
            <div class="well setting_main hide" id="size_setting_aria"
                 style="border: 3px solid #428bca; margin-top: 10px;">
                <div class="col-md-12" style="padding: 0;">
                    <h3 style="margin: 0">単位の設定</h3>
                </div>
                <?php
                $default_size_name = "";
                $default_size = 1;
                if (!$default_size) {
                    $default_size = 1;
                    $default_size_name = "ケース";
                } elseif ($default_size == 2) {
                    $default_size_name = "ボール";
                } else {
                    $default_size_name = "バラ";
                }
                ?>
                <div class="row" style="padding-left:15px;padding-right:15px;">
                    <div class="col-4" style="padding-right: 10px; padding-left: 0;">
                        <button class="btn <?= ($default_size == 1) ? 'btn-success' : 'btn-default' ?> "
                                id="size_setting_case_btn" style="margin-bottom: 0; text-align: center;">
                            ケース
                        </button>
                    </div>
                    <div class="col-4" style="padding-right: 10px; padding: 0px;">
                        <button class="btn <?= ($default_size == 2) ? 'btn-success' : 'btn-default' ?>"
                                id="size_setting_ball_btn" style="margin-bottom: 0; text-align: center;">
                            ボール
                        </button>
                    </div>
                    <div class="col-4" style="padding: 0; padding-left: 10px;">
                        <button class="btn <?= ($default_size == 3) ? 'btn-success' : 'btn-default' ?>"
                                id="size_setting_separate_btn" style="margin-bottom: 0; text-align: center;">
                            バラ
                        </button>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="row" style="padding-left:15px;padding-right:15px;">
                    <div class="col-8" style="padding-right: 10px; padding: 0px;">
                        <button class="btn btn-info" style="text-align: center; font-size: 16px; padding: 12px;"><span
                                id="size_setting_name"><?= $default_size_name ?></span>に設定しました。
                        </button>
                    </div>
                    <div class="col-4" style="padding: 0; padding-left: 10px;">
                        <button class="btn btn-warning pull-right" id="hide_size_setting_aria_close_btn"
                                style="text-align: center; font-size: 16px; padding: 12px;">完了
                        </button>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>

        </div>
    </div>
@endsection
