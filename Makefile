NODE_MODULES = node_modules
NODE_BIN = $(NODE_MODULES)/.bin
ANDROID_HOME = $(shell pwd)/android-sdk-linux
SDK_PACKAGE = android-sdk_r23.0.2-linux.tgz
ANT_HOME = apache-ant-1.9.4

PATH := $(NODE_BIN):$(ANDROID_HOME)/tools:$(ANT_HOME)/bin:$(PATH)
export ANDROID_HOME

build: $(filter-out $(wildcard $(ANT_HOME)), $(ANT_HOME))
	cordova build

emulate:
	cordova emulate android

avd:
	android create avd --name Cordova19 --target android-19 --abi default/armeabi-v7a

## cd ~/.cordova/lib/npm_cache/cordova-android/3.6.4/package/bin
## npm install shelljs
## npm install q
install: $(filter-out $(wildcard $(ANDROID_HOME)), $(ANDROID_HOME))
	cordova platform remove android
	cordova platform add android

$(NODE_MODULES): package.json
	npm install

$(ANDROID_HOME): $(SDK_PACKAGE)
	tar zxf android-sdk_r23.0.2-linux.tgz
	android update sdk -u

$(SDK_PACKAGE):
	wget http://dl.google.com/android/$(SDK_PACKAGE)

$(ANT_HOME):
	wget http://apache.mirrors.timporter.net//ant/binaries/apache-ant-1.9.4-bin.tar.gz
	tar zxf apache-ant-1.9.4-bin.tar.gz
