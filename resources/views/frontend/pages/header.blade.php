<div class="row">
                    <div class="col-md-10">
                        <div class="row">
                        <div class="col-md-2">
                            <div class="logo">
                                <img src="{{asset('public/dashboard/logo/frontend_logo.jpg')}}" class="img-responsive jacos_logo">
                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="logo_menu">
                                <button type="button" class="btn btn-primary">受信ボックス</button>
                                <button type="button" class="btn btn-secondary">データ管理</button>
                                <button type="button" class="btn btn-success">ユーザ管理</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="col-md-2 pull-right">
                        <ul class="uname text-right">
                            <li class="dropdown"><a href="#" class="user_loged" class="dropdown-toggle" data-toggle="dropdown">担当者：{{ Auth::user()->name }}</a>
                                <ul class="dropdown-menu">
                                  <li><a href="<?php echo(\Config::get('app.url').'logout');?>">Log out</a></li>
                              </ul>
                            </li>
                        </ul>
                    </div>
                </div>