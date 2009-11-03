require 'spec/rake/spectask'

task :default => [:spec]

Spec::Rake::SpecTask.new do |t|
  t.warning = true
  t.rcov = true
end

namespace :features do

  desc "regenerate all feature vectors"
  task :regenerate do
    require 'app'
    CLASSIFIER.regenerate_features
  end

end
