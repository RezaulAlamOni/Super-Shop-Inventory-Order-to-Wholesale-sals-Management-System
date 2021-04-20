@extends('backend.layouts.master')
@section('title')
<title>Shipment Page</title>
@endsection

@section('content')
@include('backend.flash_message.flash_message')
<div id="m_order_message"></div>
<div class="main-content-container container-fluid px-4">
    <!-- Page Header -->
    <div class="page-header row no-gutters py-1">
        <div class="col-md-5 col-sm-5 mb-0 text-left">
        <div class="btn-group jcs_grp">
				  <button type="button" class="btn btn-success">ＦＡＸ・手書受注画面</button>
				  <button type="button" class="btn btn-default deflt_design_adjust"> 
<input type="tel" style="ime-mode: disabled;float:left;border:1px solid #ddd;" class="form-control jan_inpts" placeholder="ＪＡＮまたはインストア入力">
				</button>

				  <button type="button" class="btn btn-info"><a class="page_manage custom_online_order" style="color:#fff" href="onlineorder">ｵﾝﾗｲﾝ</a></button>
				  
        </div>
        <p class="hmdate">納品日　<?php echo date("m", time());?>月<?php echo date("d", time());?>日</p>
        <p class="shps_byrsplrs">販売先名<span class="jcs_main_hand_title"></span>殿</p>
        </div>
        <div class="col-md-7 col-sm-7 mb-0 text-right">
        <input type="hidden" value="0" class="c_ids_v">
        <input type="hidden" value="0" class="customer_manual_order_status">
        <div class="top_btn_list">
			<ul class="top_page_btn_list_jacos list-inline">
			  <li><a href="#" delete_st="0" class="btn btn-danger btn-lg delete_entry">行削除</a></li>
			  <li><a href="home" class="btn btn-danger btn-lg">業務選択</a></li>
				<li><a href="shipment" class="btn btn-warning btn-lg">履歴</a></li>
				<li><button class="btn btn-warning manual_order_exe btn-lg">完了</button></li>
				<li><button class="btn customer_list_show_popup btn-warning btn-lg">販売先一覧</button></li>
				<li><a href="#" id="left" class="btn btn-info btn-lg scroll_to_right">左へ移動</a></li>
				<li><a href="#" id="right" class="btn btn-primary btn-lg scroll_to_left">右へ移動</a></li>
			</ul>
			
			
		</div>
        </div>
    </div>
    <!-- End Page Header -->
    <!-- Small Stats Blocks -->
    <div class="row">

    </div>
    <br>
    <div class="row">
    <?php 
        $totalshop = 0; 
        $van_shp_list = array();
				$countcol_group = $totalshop*3+5;
				if($countcol_group==5){?>
				
				<?php }
				?>
	<!-- menual_order_tble -->
	<!-- <div class="col-12 text-right">
		<button class="btn btn-success">受注データ取込</button>
		<input type="file" id="shipment_csv_input" name="shipment_csv" accept=".csv">
	</div> -->
        <div class="col-md-12 menual_order_receive_table">
        <div id="manual_order_table_entry" style="margin:0">  
            <table class="table table-bordered table-freeze-multi" data-scroll-height="680" data-cols-number="5">
            <colgroup class="custom_col_group">
						<?php for($cl=1;$cl<=$countcol_group;$cl++){?>
						<col>
						<?php }?>
					</colgroup>
					<thead class="custom_tble_header_content" style="background-color: #F5F6F8; color: #077BEF; font-size:15px; text-align: center;">
						

					</thead>
                <tbody class="menual_order_tble">
                        


                </tbody>
            </table>
            </div>
            
        </div>
    </div>

</div>
@endsection