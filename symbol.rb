require 'csv'
require 'digest'

module Unicode

  class Symbol
        
    #:nodoc:
    A = [:codepoint, :name, :block ]
    
    attr_reader *A
    attr_reader :id

    def initialize args = {}
      raise ArgumentError.new('You need at least a codepoint for a Unicode symbol.') unless args[:codepoint]
      # defauls
      args = { :bock => nil, :name => nil }.update(args)
      # init
      args.each do |k,v|
        instance_variable_set "@#{k}", v if A.include? k
      end
      @id = @codepoint.to_s(base=16).to_sym
    end
    
    def [](k)
      send k if A.include?(k) || k == :id
    end
    
    # def ==(other)
    #   id == other.id
    # end
    
    def to_s
      "#{codepoint} (#{name})"
    end
    
    def filename
      # id.to_s
      Digest::MD5.hexdigest id.to_s
    end
    
    def to_hash
      h = {}
      A.each { |a| !self[a].nil? && (h[a] = self[a]) }
      h[:id] = self[:id]
      h
    end
    
    # This needs to be extendable and queryable somewhere
    blocks = [ { :from=> 0x2200, :to => 0x22FF, :name => "Mathematical Operators" },
               { :from=> 0x2300, :to => 0x23FF, :name => "Miscellaneous Technical" },
	     ]

    symbols = CSV.open( File.join(File.expand_path(File.dirname(__FILE__)),'UnicodeData.txt'), 'r', col_sep=';')

    l = []
    
    symbols.each do |r|
      codepoint = r[0].to_i(16)
      name = r[1]
      blocks.map do |range|
        if range[:from] <= codepoint and codepoint <= range[:to]
	then
	  l +=  [new({:codepoint => codepoint, :name => r[1], :block => range[:name]})]
	end
      end
    end

    List = l

    def self.[](id)
      id = id.to_sym
      List.find { |symbol| symbol.id == id }
    end
            
  end
end
