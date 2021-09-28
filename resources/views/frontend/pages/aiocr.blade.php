@extends('frontend.layouts.master')
@section('content')
<div class="row">
@if(Session::get('message'))
<div class="alert {{Session::get('class_name')}} alert-dismissible fade show mb-0" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
  </button>
  <i class="fa fa-check mx-2"></i>
  <strong>Message: </strong>{{ Session::get('message') }}            
</div>
@endif
                    <div class="col-md-3">
                        <div class="left_cl_area cmn_cl_border">
                            <div class="text-center">
                                <button type="button" class="btn btn-lg btn-outline-dark">受信ボックス</button>
                            </div>
                            <br>
                            <div class="clearfix"></div>
                            <h4 class="left_cl_titles text-center">.受信トレイ</h4>
                            <div class="clearfix"></div>
                            <ul id="myUL">
                              <li><span class="caret">aaa(2)</span>
                                <ul class="nested">
                                  <li>Water</li>
                                  <li>Coffee</li>
                                  <li><span class="caret">Tea</span>
                                    <ul class="nested">
                                      <li>Black Tea</li>
                                      <li>White Tea</li>
                                      <li><span class="caret">Green Tea</span>
                                        <ul class="nested">
                                          <li>Sencha</li>
                                          <li>Gyokuro</li>
                                          <li>Matcha</li>
                                          <li>Pi Lo Chun</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                              <li><span class="caret">bbb(2)</span>
                                <ul class="nested">
                                  <li>Water</li>
                                  <li>Coffee</li>
                                  <li><span class="caret">Tea</span>
                                    <ul class="nested">
                                      <li>Black Tea</li>
                                      <li>White Tea</li>
                                      <li><span class="caret">Green Tea</span>
                                        <ul class="nested">
                                          <li>Sencha</li>
                                          <li>Gyokuro</li>
                                          <li>Matcha</li>
                                          <li>Pi Lo Chun</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                              <li><span class="caret">ccc(2)</span>
                                <ul class="nested">
                                  <li>Water</li>
                                  <li>Coffee</li>
                                  <li><span class="caret">Tea</span>
                                    <ul class="nested">
                                      <li>Black Tea</li>
                                      <li>White Tea</li>
                                      <li><span class="caret">Green Tea</span>
                                        <ul class="nested">
                                          <li>Sencha</li>
                                          <li>Gyokuro</li>
                                          <li>Matcha</li>
                                          <li>Pi Lo Chun</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                              <li><span class="caret">ddd(2)</span>
                                <ul class="nested">
                                  <li>Water</li>
                                  <li>Coffee</li>
                                  <li><span class="caret">Tea</span>
                                    <ul class="nested">
                                      <li>Black Tea</li>
                                      <li>White Tea</li>
                                      <li><span class="caret">Green Tea</span>
                                        <ul class="nested">
                                          <li>Sencha</li>
                                          <li>Gyokuro</li>
                                          <li>Matcha</li>
                                          <li>Pi Lo Chun</li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="middle_cl_area cmn_cl_border">
                            <div class="text-left">
                                <button type="button" class="btn btn-lg btn-outline-dark"><span class="cat_main">.....</span>社</button>
<button type="button" class="btn btn-lg btn-outline-dark">送信元番号</button>
<button type="button" class="btn btn-info insert_nw">新規データ取り込み</button>
                            </div>
                            
                            <br>
                            <div class="clearfix"></div>
                            
                            <div class="clearfix"></div>
                            <div class="datatble_area">
                                <table id="content_data_tble" class="table table-bordered" style="width:100%">
        <thead>
            <tr>
                <th>登録日時</th>
                <th>ステタス</th>
                <th>担当者</th>
                <th>伝票番号</th>
            </tr>
        </thead>
        <tbody>
            
            </tbody>
            </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="right_cl_area cmn_cl_border">
                            <div class="imgsection">
                                <h4 class="left_cl_titles text-center">プレビュー</h4>
                                <div class="clearfix"></div>
                                <div class="text-center">
                                <img src="" alt="Picture" class="img-thumbnail custom_thums">
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="rigt_btm_sec">
                            <br>
                                <p class="text-center">最終チェック日時</p>
                                <button type="button" class="btn btn-sm btn-success">FAX印刷</button>
                                <button type="button" class="btn btn-sm btn-danger">チェック</button>
                                <button type="button" class="btn btn-sm btn-warning">CSVダウンロード</button>
                            </div>
                        </div>
                    </div>
                </div>
@endsection