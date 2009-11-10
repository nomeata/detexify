require File.expand_path(File.join(File.dirname(__FILE__), 'spec_helper'))

require 'erb'
require 'symbol'

describe Unicode::Symbol do
  
  before do
    @symbol = Unicode::Symbol.new :codepoint => 1234, :block => 'Non-existing characters', :name => 'SOME CHARACTER'
  end

  it "should have properties codepoint, block, name" do
    [:codepoint, :block, :name].each do |m|
      @symbol.should respond_to(m)
    end
  end
  
  it "should require codepoint and rest is optional" do
    lambda { Unicode::Symbol.new :codepoint => 1234 }.should_not raise_error
    lambda { Unicode::Symbol.new }.should raise_error(ArgumentError)
  end
    
  it "should have a good to_s" do
    @symbol.to_s.should == '1234 (SOME CHARACTER)'
  end

  it "should have to_hash" do
    @symbol.to_hash.should == { :codepoint => 1234, :block => 'Non-existing characters', :name => 'SOME CHARACTER', :id => @symbol.id}
  end
end

describe 'Unicode::Symbol::List' do

  TEMPLATE = ERB.new open(File.join(File.dirname(__FILE__), '..', 'template.tex.erb')).read
  it "should have all different ids" do
    ids = Unicode::Symbol::List.map { |symbol| symbol.id }
    ids.size.should == ids.uniq.size
  end
end
